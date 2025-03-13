import React from 'react';

const PrivacyPolicySection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Privacy Policy</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-600">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Introduction</h3>
            <p className="mb-4">
              Life Got Better Homecare ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our website and mobile application.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Information We Collect</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Health and medical information necessary for care services</li>
              <li>Emergency contact information</li>
              <li>Device information and usage data</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our care services</li>
              <li>To communicate with you about our services</li>
              <li>To improve our services and user experience</li>
              <li>To comply with legal obligations</li>
              <li>To protect the rights and safety of our clients and staff</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Information Security</h3>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Your Rights</h3>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Contact Us</h3>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: contact@lifegotbetterhomecare.com
              <br />
              Phone: [Your Phone Number]
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Updates to This Policy</h3>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The updated version will be 
              indicated by an updated "Last Updated" date and the updated version will be effective 
              as soon as it is accessible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
