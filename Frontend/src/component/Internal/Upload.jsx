import React, { useState } from "react";

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
  
  // For the confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePublicationTypeChange = (event) => {
    const selectedType = event.target.value;
    setPublicationType(selectedType);
    setIsOtherType(selectedType === "Other");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);  // Show the confirmation popup
  };

  const handleConfirmation = (confirm) => {
    if (confirm) {
      // You can simulate form submission here or reset form data
      setSuccessMessage("Publication submitted successfully!");
      setErrorMessage("");
    } else {
      // Close the confirmation popup
      setShowConfirmation(false);
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Submission</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Co-Authors:</strong> {coAuthors}</p>
            <p><strong>Type of Publication:</strong> {publicationType}</p>
            <p><strong>Conference/Journal Name:</strong> {conferenceName}</p>
            <p><strong>Publication Date:</strong> {publicationDate}</p>
            <p><strong>Fee:</strong> {fee}</p>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleConfirmation(true)}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => handleConfirmation(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPublication;
