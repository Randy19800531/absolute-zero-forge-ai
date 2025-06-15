
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

const APIDocsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          API Documentation & Integration Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🔌 REST API Overview</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <p className="text-sm mb-2">Base URL: <code className="text-green-400">https://api.absolute-0.ai/v1</code></p>
              <p className="text-sm mb-2">Authentication: Bearer Token (API Key)</p>
              <p className="text-sm">Rate Limit: 1000 requests/hour (adjustable per plan)</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🔑 Authentication</h4>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">API Key Generation</h5>
                <ol className="text-sm text-gray-600 space-y-1">
                  <li>1. Navigate to Admin Portal → API Management</li>
                  <li>2. Click "Generate New API Key"</li>
                  <li>3. Set permissions and expiration date</li>
                  <li>4. Copy and securely store the generated key</li>
                </ol>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <p className="text-sm mb-2">Example Request Header:</p>
                <code className="text-green-400">Authorization: Bearer your-api-key-here</code>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">📡 Core Endpoints</h4>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                  <code className="text-sm">/workflows/execute</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Execute a workflow with custom parameters</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`{
  "workflow_id": "wf_123abc",
  "parameters": {
    "input_data": "value",
    "options": {}
  }
}`}</pre>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                  <code className="text-sm">/workflows/[workflow_id]/status</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Get workflow execution status and results</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`{
  "status": "completed",
  "progress": 100,
  "result": {...},
  "execution_time": "2.3s"
}`}</pre>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                  <code className="text-sm">/ai/generate-vba</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Generate VBA code from natural language description</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`{
  "description": "Create a macro to format cells",
  "requirements": {
    "excel_version": "2019",
    "complexity": "intermediate"
  }
}`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🔗 Webhook Integration</h4>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Configure webhooks to receive real-time notifications about workflow executions, 
                  system events, and integration status updates.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Supported Events</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• workflow.started</li>
                    <li>• workflow.completed</li>
                    <li>• workflow.failed</li>
                    <li>• integration.connected</li>
                    <li>• integration.error</li>
                    <li>• system.maintenance</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-medium mb-2">Configuration</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Admin Portal → Webhooks</li>
                    <li>• Set endpoint URL</li>
                    <li>• Choose event types</li>
                    <li>• Configure retry settings</li>
                    <li>• Test webhook delivery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">📚 SDK & Libraries</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">JavaScript SDK</h5>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`npm install @absolute0/js-sdk

import A0 from '@absolute0/js-sdk';
const client = new A0('your-api-key');`}</pre>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Python SDK</h5>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`pip install absolute0-python

from absolute0 import Client
client = Client('your-api-key')`}</pre>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">REST Client</h5>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`curl -X POST \\
  -H "Authorization: Bearer key" \\
  -H "Content-Type: application/json" \\
  https://api.absolute-0.ai/v1/`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIDocsTab;
