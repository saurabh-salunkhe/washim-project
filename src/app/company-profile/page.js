"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CompanyForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    description: "",
    size: "",
    location: "",
    founded_year: "",
    social_links: [{ platform: "", url: "" }], // <-- One empty social link by default
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes for main fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle social links change (platform or url)
  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, social_links: updatedLinks });
  };

  // Add new empty social link input
  const addSocialLink = () => {
    setFormData({
      ...formData,
      social_links: [...formData.social_links, { platform: "", url: "" }],
    });
  };

  // Remove social link input by index
  const removeSocialLink = (index) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, social_links: updatedLinks });
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Convert social_links array to object with keys as platform names
    const socialLinksObject = formData.social_links.reduce((acc, link) => {
      if (link.platform && link.url) {
        acc[link.platform] = link.url;
      }
      return acc;
    }, {});

    const payload = {
      name: formData.name,
      industry: formData.industry,
      website: formData.website,
      description: formData.description,
      size: formData.size,
      location: formData.location,
      founded_year: formData.founded_year,
      social_links: socialLinksObject,
    };

    try {
      await axios.post(
        "https://drona-job-portal-be.onrender.com/api/company/create",
        payload
      );
      setMessage("✅ Company created successfully!");
      setFormData({
        name: "",
        industry: "",
        website: "",
        description: "",
        size: "",
        location: "",
        founded_year: "",
        social_links: [{ platform: "", url: "" }], // Reset to one empty social link again
      });

      // Redirect to dashboard after success
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
          radial-gradient(circle at top left, #A5E3FF 0%, transparent 40%),
          radial-gradient(circle at bottom right, #A5E3FF 0%, transparent 40%)
        `,
     }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border border-gray-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Company</h2>

        {[
          { name: "name", label: "Name" },
          { name: "industry", label: "Industry" },
          { name: "website", label: "Website" },
          { name: "description", label: "Description", textarea: true },
          { name: "size", label: "Size" },
          { name: "location", label: "Location" },
          { name: "founded_year", label: "Founded Year" },
        ].map(({ name, label, textarea }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            {textarea ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="3"
                required
              />
            ) : (
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            )}
          </div>
        ))}

        {/* Social Links Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Social Links
          </label>

          {formData.social_links.map((link, index) => (
            <div key={index} className="flex space-x-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Platform (e.g. Facebook)"
                value={link.platform}
                onChange={(e) =>
                  handleSocialLinkChange(index, "platform", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-lg p-2"
                required
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) =>
                  handleSocialLinkChange(index, "url", e.target.value)
                }
                className="flex-2 border border-gray-300 rounded-lg p-2"
                required
              />
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="text-red-600 font-bold px-2 py-1 rounded hover:bg-red-100"
                title="Remove social link"
                disabled={formData.social_links.length === 1} // Disable remove if only 1 left
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSocialLink}
            className="text-blue-600 hover:underline"
          >
            + Add Social Link
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Company"}
        </button>

        {message && <p className="mt-4 text-center font-medium">{message}</p>}
      </form>
    </div>
  );
}
