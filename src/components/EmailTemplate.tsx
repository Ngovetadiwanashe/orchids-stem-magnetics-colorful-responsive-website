import * as React from 'react';

interface EmailTemplateProps {
  title: string;
  data: Record<string, any>;
  type: 'contact' | 'quote';
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
  data,
  type,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#E63946' }}>{title}</h1>
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      {type === 'contact' ? (
        <>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> {data.subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.message}</p>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone || 'N/A'}</p>
          <p><strong>Company:</strong> {data.company || 'N/A'}</p>
          <p><strong>Selected Products:</strong> {data.productNames || 'None selected'}</p>
          <p><strong>Message/Requirements:</strong></p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.message}</p>
        </>
      )}
    </div>
    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
    <p style={{ fontSize: '12px', color: '#888' }}>
      This message was sent from the Stem Magnetics website contact forms.
    </p>
  </div>
);
