import { useEffect, useState } from 'react';

const FileTable = ({ folderId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (fileName) => {
    setIsDownloading(true);

    try {
      const downloadUrl = `/api/downloadfile?id=${folderId}&file=${fileName}`;
      const response = await fetch(downloadUrl);

      if (response.ok) {
        const fileBlob = await response.blob();
        const tempLink = document.createElement('a');
        const fileUrl = window.URL.createObjectURL(fileBlob);
        tempLink.href = fileUrl;
        tempLink.setAttribute('download', fileName);

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      } else {
        console.error('Failed to download the file');
      }
    } catch (error) {
      console.error('Error occurred while downloading the file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/api/files?id=${folderId}`);
        const data = await response.json();

        if (response.ok) {
          setFiles(data.files);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [folderId]);

  if (loading) return <p>Loading files...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">S. No.</th>
            <th className="px-4 py-2 border">File Name</th>
            <th className="px-4 py-2 border">Download</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{file}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-white bg-custom-green px-4 py-2 rounded"
                    onClick={() => handleDownload(file)}
                    disabled={isDownloading}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border" colSpan="3">
                No files found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default FileTable;
