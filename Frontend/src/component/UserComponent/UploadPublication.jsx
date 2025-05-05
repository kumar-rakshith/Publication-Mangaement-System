import React, { useState } from "react";
import axios from "axios";

const UploadPublication = () => {
  const [publicationType, setPublicationType] = useState("");
  const [isOtherType, setIsOtherType] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [coAuthors, setCoAuthors] = useState("");
  const [conferenceName, setConferenceName] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [fee, setFee] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePublicationTypeChange = (event) => {
    const selectedType = event.target.value;
    setPublicationType(selectedType);
    setIsOtherType(selectedType === "Other");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author_name', name);
    formData.append('co_authors', coAuthors);
    formData.append('publication_type', publicationType);
    formData.append('conference_name', conferenceName);
    formData.append('publication_date', publicationDate);
    formData.append('fee', fee);
    formData.append('file', file); // File input
  
    try {
      const response = await axios.post('http://localhost:5000/api/publications/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(response);
  
      if (response.data.message) {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('Error uploading publication' + error);

     console.log(error)
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Upload Publication</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
            />
          </label>

          <label className="block">
            Title of the Publication
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of the publication"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
            />
          </label>

          <label className="block">
            Co-Author(s)
            <input
              type="text"
              value={coAuthors}
              onChange={(e) => setCoAuthors(e.target.value)}
              placeholder="Enter co-authors' names"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
            />
          </label>

          {/* Type of Publication */}
          <div className="space-y-2">
            <p className="font-semibold">Type of Publication</p>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  value="National"
                  checked={publicationType === "National"}
                  onChange={handlePublicationTypeChange}
                  className="mr-2"
                />
                National
              </label>
              <label>
                <input
                  type="radio"
                  value="International"
                  checked={publicationType === "International"}
                  onChange={handlePublicationTypeChange}
                  className="mr-2"
                />
                International
              </label>
              <label>
                <input
                  type="radio"
                  value="Journal"
                  checked={publicationType === "Journal"}
                  onChange={handlePublicationTypeChange}
                  className="mr-2"
                />
                Journal
              </label>
              <label>
                <input
                  type="radio"
                  value="Conference Proceedings"
                  checked={publicationType === "Conference Proceedings"}
                  onChange={handlePublicationTypeChange}
                  className="mr-2"
                />
                Conference Proceedings
              </label>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={publicationType === "Other"}
                  onChange={handlePublicationTypeChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
            {isOtherType && (
              <input
                type="text"
                placeholder="Please specify"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
              />
            )}
          </div>

          <label className="block">
            Name of Conference/Journal
            <input
              type="text"
              value={conferenceName}
              onChange={(e) => setConferenceName(e.target.value)}
              placeholder="Enter name of the conference or journal"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
            />
          </label>

          <label className="block">
            Date of Publication
            <input
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
            />
          </label>

          <label className="block">
            Registration/Publication Fee
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="Enter registration/publication fee"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
            />
          </label>

          <label className="block">
            File Upload
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1"
            />
          </label>

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          {successMessage && <div className="text-green-500">{successMessage}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Upload Publication
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPublication;

