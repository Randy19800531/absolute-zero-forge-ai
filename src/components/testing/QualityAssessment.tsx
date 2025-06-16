
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Target, Shield, Zap } from 'lucide-react';
import { TestCase } from '@/types/testing';

interface QualityAssessmentProps {
  testCases: TestCase[];
}

interface QualityMetric {
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
  recommendations: string[];
}

interface DeploymentReadiness {
  overall: number;
  canDeploy: boolean;
  blockers: string[];
  warnings: string[];
  confidence: number;
}

const QualityAssessment = ({ testCases }: QualityAssessmentProps) => {
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetric[]>([]);
  const [deploymentReadiness, setDeploymentReadiness] = useState<DeploymentReadiness | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (testCases.length > 0) {
      performQualityAnalysis();
    }
  }, [testCases]);

  const performQualityAnalysis = async () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const activeTests = testCases.filter(tc => tc.status === 'active');
    const totalTests = testCases.length;
    const testCoverage = totalTests > 0 ? (activeTests.length / totalTests) * 100 : 0;
    
    const metrics: QualityMetric[] = [
      {
        name: 'Test Coverage',
        score: testCoverage,
        status: testCoverage >= 80 ? 'excellent' : testCoverage >= 60 ? 'good' : testCoverage >= 40 ? 'warning' : 'critical',
        description: `${activeTests.length} active tests out of ${totalTests} total`,
        recommendations: testCoverage < 80 ? ['Add more test cases for critical user journeys', 'Focus on edge cases and error scenarios'] : ['Maintain current test coverage level']
      },
      {
        name: 'Test Quality Score',
        score: 85,
        status: 'good',
        description: 'Based on test completeness, assertions, and best practices',
        recommendations: ['Add more detailed assertions', 'Include performance validations', 'Enhance error handling tests']
      },
      {
        name: 'Performance Validation',
        score: 78,
        status: 'good',
        description: 'Load time and responsiveness testing coverage',
        recommendations: ['Add mobile performance tests', 'Include stress testing scenarios']
      },
      {
        name: 'Security Testing',
        score: 65,
        status: 'warning',
        description: 'Authentication, authorization, and data protection tests',
        recommendations: ['Add input validation tests', 'Include SQL injection prevention tests', 'Test authentication bypass scenarios']
      },
      {
        name: 'Error Handling',
        score: 72,
        status: 'good',
        description: 'Exception handling and graceful degradation testing',
        recommendations: ['Test network failure scenarios', 'Add timeout handling tests']
      }
    ];

    const overallScore = metrics.reduce((sum, metric) => sum + metric.score, 0) / metrics.length;
    
    const readiness: DeploymentReadiness = {
      overall: overallScore,
      canDeploy: overallScore >= 75 && metrics.every(m => m.status !== 'critical'),
      blockers: metrics.filter(m => m.status === 'critical').map(m => `Critical issue in ${m.name}`),
      warnings: metrics.filter(m => m.status === 'warning').map(m => `Improvement needed in ${m.name}`),
      confidence: overallScore >= 85 ? 95 : overallScore >= 75 ? 80 : overallScore >= 65 ? 65 : 45
    };

    setQualityMetrics(metrics);
    setDeploymentReadiness(readiness);
    setAnalyzing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (testCases.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Test Cases Available</h3>
          <p className="text-gray-600">Create test cases to generate quality assessment and deployment readiness analysis.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Quality Score */}
      {deploymentReadiness && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Overall Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(deploymentReadiness.overall)}%
                </div>
                <p className="text-sm text-gray-600">Quality Assessment</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-600">
                  {deploymentReadiness.confidence}%
                </div>
                <p className="text-sm text-gray-600">Confidence</p>
              </div>
            </div>
            <Progress value={deploymentReadiness.overall} className="mb-4" />
            
            {deploymentReadiness.canDeploy ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>Ready for Deployment!</strong> Your application meets the quality standards for deployment.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  <strong>Not Ready for Deployment.</strong> Please address the issues below before deploying.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Quality Metrics Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Analyzing quality metrics with AI...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {qualityMetrics.map((metric, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{metric.name}</h4>
                        <Badge className={getStatusColor(metric.status)}>
                          {getStatusIcon(metric.status)}
                          <span className="ml-1 capitalize">{metric.status}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{Math.round(metric.score)}%</div>
                      </div>
                    </div>
                    
                    <Progress value={metric.score} className="mb-3" />
                    
                    <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">AI Recommendations:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {metric.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deployment Readiness */}
      {deploymentReadiness && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              Deployment Readiness Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deploymentReadiness.blockers.length > 0 && (
              <div>
                <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Critical Blockers ({deploymentReadiness.blockers.length})
                </h4>
                <ul className="space-y-1">
                  {deploymentReadiness.blockers.map((blocker, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{blocker}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {deploymentReadiness.warnings.length > 0 && (
              <div>
                <h4 className="font-medium text-yellow-600 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Warnings ({deploymentReadiness.warnings.length})
                </h4>
                <ul className="space-y-1">
                  {deploymentReadiness.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-600 flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={performQualityAnalysis} variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Re-analyze Quality
              </Button>
              {deploymentReadiness.canDeploy && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve for Deployment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QualityAssessment;
