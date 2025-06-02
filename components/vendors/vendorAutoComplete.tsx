import { useState, useEffect } from 'react';

export default function VendorAutocomplete({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 1) {
        fetch(`/api/searchVendors?query=${query}`)
          .then(res => res.json())
          .then(data => setResults(data));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (vendor) => {
    setQuery(vendor.companyName);
    setShowDropdown(false);
    onSelect(vendor); // pass selected vendor up
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Enter vendor name"
        className="border p-2 w-full rounded"
        required
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto">
          {results.map((vendor) => (
            <li
              key={vendor._id}
              onClick={() => handleSelect(vendor)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {vendor.companyName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
