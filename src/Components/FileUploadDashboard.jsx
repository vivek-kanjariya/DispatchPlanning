import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';

const MAX_FILE_SIZE = 15 * 1024 * 1024;

const FileUploadDashboard = ({ setPopup }) => {
  const [summary, setSummary] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const extractTop3Values = (data) => {
    const columnData = {};
    data.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        if (!columnData[key]) columnData[key] = [];
        if (columnData[key].length < 3 && !columnData[key].includes(value)) {
          columnData[key].push(value);
        }
      });
    });
    return columnData;
  };

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
        let data;
        if (extension === 'csv') {
          const result = Papa.parse(e.target.result, { header: true, skipEmptyLines: true });
          data = result.data;
        } else if (extension === 'xlsx') {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          data = XLSX.utils.sheet_to_json(sheet);
        } else {
          throw new Error('Unsupported file format');
        }

        setSummary(extractTop3Values(data));
        setMeta(extractMetadata(data));
      } catch (err) {
        setError('Error parsing file');
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
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/upload', summary); // 🔁 Replace with your backend

      if (response.status === 200) {
        setPopup({ type: 'success', message: 'Data successfully submitted!' });
      } else {
        setPopup({ type: 'error', message: 'Unexpected server response.' });
      }
    } catch (err) {
      setPopup({ type: 'error', message: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4 py-6 rounded-2xl shadow-lg border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md transition-all">
      {/* Drop Area */}
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

      {summary && (
        <>
          <div className="mt-6 text-gray-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">Data Summary</h2>
            <div className="bg-white/10 dark:bg-white/5 p-4 rounded-md max-h-[300px] overflow-y-auto text-sm">
              <pre className="text-gray-700 dark:text-gray-300">{JSON.stringify(summary, null, 2)}</pre>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={sendToBackend}
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
