import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';

const MAX_FILE_SIZE = 15 * 1024 * 1024;

const FileUploadDashboard = ({
  setPopup,
  sampleFilePath = "/sample.csv",
  endpoint = "http://127.0.0.1:8000/api/data/",
  setResponse,
}) => {
  const [fileData, setFileData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const extractMetadata = (data) => {
    const columns = Object.keys(data[0] || {});
    return {
      columnCount: columns.length,
      rowCount: data.length,
      columns,
    };
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 15MB limit');
      return;
    }

    setError('');
    setLoading(true);
    setFileName(file.name);

    const reader = new FileReader();
    const extension = file.name.split('.').pop().toLowerCase();

    reader.onload = (e) => {
      try {
        let data = [];

        if (extension === 'csv') {
          const result = Papa.parse(e.target.result, {
            header: true,
            skipEmptyLines: true,
          });
          data = result.data;
        } else if (extension === 'xlsx') {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          data = XLSX.utils.sheet_to_json(sheet);
        } else {
          throw new Error('Unsupported file format');
        }

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Parsed data is empty or invalid');
        }

        setFileData(data);
        setMeta(extractMetadata(data));
      } catch (err) {
        console.error('Parse Error:', err);
        setError('Failed to parse file content');
        setPopup?.({ type: 'error', message: 'File parsing failed' });
      } finally {
        setLoading(false);
      }
    };

    if (extension === 'csv') {
      reader.readAsText(file);
    } else if (extension === 'xlsx') {
      reader.readAsBinaryString(file);
    } else {
      setError('Only .csv and .xlsx files are supported');
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setError('Invalid file type');
      return;
    }
    handleFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  const sendToBackend = async () => {
    if (!fileData || !meta) {
      console.error("❌ Missing file data or metadata");
      setPopup?.({ type: 'error', message: 'Missing file data or metadata' });
      return;
    }

    if (!endpoint) {
      console.error("❌ Endpoint is not defined");
      setPopup?.({ type: 'error', message: 'No API endpoint provided' });
      return;
    }


    const payload = {
      columns: meta.columns,
      data: fileData.map(row => meta.columns.map(col => row[col] ?? null)),
    };

    console.log("PreUpload Payload:", payload);
    console.log("Using endpoint:", endpoint);

    try {
      setLoading(true);
      setPopup?.(null);
      const start = performance.now();

      const response = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
      });

      if (response.status === 200) {
        setPopup?.({ type: 'success', message: 'Prediction sent successfully' });
        if (setResponse && typeof setResponse === 'function') {
          setResponse(response.data);
        }
      } else {
        setPopup?.({ type: 'error', message: 'Unexpected server response' });
      }
    const end = performance.now();
    const latencyMs = end - start;

    console.log("API Latency:", latencyMs.toFixed(2), "ms");

    } catch (err) {
      console.error('Backend error:', err);
      setPopup?.({
        type: 'error',
        message: err?.response?.data?.detail || 'Failed to connect to backend',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSampleFile = async () => {
    setLoading(true);
    setError('');
    setFileName(sampleFilePath.split('/').pop());

    try {
      const response = await fetch(sampleFilePath);
      const text = await response.text();

      const result = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      if (!Array.isArray(result.data) || result.data.length === 0) {
        throw new Error("Sample file is empty or invalid");
      }

      setFileData(result.data);
      setMeta(extractMetadata(result.data));
    } catch (err) {
      console.error("Failed to load sample:", err);
      setError("Failed to load sample file");
      setPopup?.({ type: "error", message: "Sample load failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4 py-6 rounded-2xl shadow-lg border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md transition-all">
      <div className="mb-4 flex justify-end">
        <button
          onClick={loadSampleFile}
          className="bg-gray-200 dark:bg-gray-800 text-sm text-black dark:text-white px-4 py-2 rounded hover:brightness-110"
        >
          Load Sample File
        </button>
      </div>

      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-10 rounded-xl text-center cursor-pointer hover:bg-white/10 dark:hover:bg-white/5 transition-all">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-900 dark:text-white font-semibold">Drop the file here...</p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">Drag & drop a .csv or .xlsx file here, or click to select</p>
        )}
      </div>

      {error && <p className="mt-4 text-red-500 font-medium text-center">{error}</p>}
      {fileName && !error && <p className="mt-3 text-green-600 dark:text-green-400 text-center">File: {fileName}</p>}
      {loading && <p className="mt-4 text-yellow-600 dark:text-yellow-400 text-center">Processing...</p>}

      {meta && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">File Metadata</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">Columns: {meta.columnCount}, Rows: {meta.rowCount}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {meta.columns.map((col, idx) => (
              <span key={idx} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">{col}</span>
            ))}
          </div>
        </div>
      )}

      {fileData && (
        <>
          <div className="mt-6 text-gray-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">Preview Data (first 3 rows)</h2>
            <div className="bg-white/10 dark:bg-white/5 p-4 rounded-md max-h-[300px] overflow-x-auto text-sm">
              <pre className="text-gray-700 dark:text-gray-300">
                {JSON.stringify(fileData.slice(0, 3), null, 2)}
              </pre>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={sendToBackend}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Send to Backend
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploadDashboard;
