
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const SecurityTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security & Compliance Framework
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">SOC 2 Type II</h4>
            <p className="text-sm text-red-700">
              Comprehensive controls for security, availability, processing integrity, 
              confidentiality, and privacy with annual audits.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">ISO 27001:2013</h4>
            <p className="text-sm text-blue-700">
              International standard for information security management systems 
              with continuous monitoring and improvement processes.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">GDPR Compliant</h4>
            <p className="text-sm text-green-700">
              Full compliance with European data protection regulations including 
              data portability, right to erasure, and consent management.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">🔐 Data Protection Measures</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-600">
                <li>• AES-256 encryption for data at rest</li>
                <li>• TLS 1.3 for data in transit</li>
                <li>• Zero-knowledge architecture</li>
                <li>• Hardware security modules (HSMs)</li>
                <li>• Regular key rotation and management</li>
              </ul>
              <ul className="space-y-2 text-gray-600">
                <li>• Multi-region data replication</li>
                <li>• Point-in-time recovery capabilities</li>
                <li>• Automated backup verification</li>
                <li>• Disaster recovery testing</li>
                <li>• Business continuity planning</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">🛡️ Access Control & Authentication</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-600">
                <li>• Multi-factor authentication (MFA) required</li>
                <li>• Single Sign-On (SSO) integration</li>
                <li>• Role-based access control (RBAC)</li>
                <li>• Principle of least privilege</li>
                <li>• Session management and timeout</li>
              </ul>
              <ul className="space-y-2 text-gray-600">
                <li>• API key management and rotation</li>
                <li>• OAuth 2.0 and OpenID Connect</li>
                <li>• IP whitelisting and geo-blocking</li>
                <li>• Device fingerprinting</li>
                <li>• Anomaly detection and response</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📊 Monitoring & Compliance</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• 24/7 security operations center (SOC)</li>
              <li>• Real-time threat detection and response</li>
              <li>• Comprehensive audit logging (5-year retention)</li>
              <li>• Vulnerability scanning and penetration testing</li>
              <li>• Regular security awareness training</li>
              <li>• Incident response and forensics capabilities</li>
              <li>• Third-party security assessments</li>
              <li>• Compliance reporting and documentation</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
