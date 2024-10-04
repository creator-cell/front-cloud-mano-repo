"use client"

import React, { useState } from 'react'
import SectionLayout from '@/components/common/CommonSectionLayout'
import PageWrapper from '../../../_components/PageWrapper'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CodeEditorWithPreview from '../_components/CodeEditorWithPreview';
import PhraseModal from '../_components/PhraseModal';
import PhraseList from '../_components/PhraseList';

const jsonData = {
    template: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Account Settings Edited</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #eeeeee;
        }
        .header h1 {
          color: #333333;
          font-size: 24px;
          margin: 0;
        }
        .content {
          padding: 20px 0;
        }
        .content p {
          color: #666666;
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 10px 0;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Account Settings Updated</h1>
        </div>
        <div class="content">
          <p>Hi [Customer Name],</p>
          <p>We wanted to inform you that your account settings have been successfully updated.</p>
          <p>If you did not make these changes or believe this to be a mistake, please contact our support team immediately.</p>
          <p>Thank you for being a valued member of <strong>FrontCloud</strong>.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 FrontCloud. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `
};


const EmailTemplateEditPage = () => {



    const phrases = [
        { name: "subject", value: "Your {store} account details have changed" },
        { name: "hello", value: "Hello {name}," },
        { name: "message", value: "We wanted to let you know that the following details have been changed on your <a href=\"{link}\" target=\"_blank\">{store}</a> account:" },
        { name: "warning", value: "If you made the changes yourself, please disregard this email. If not, please contact the store immediately through their website: <a href=\"{link}\" target=\"_blank\">{domain}</a>." },
        { name: "thanks", value: "Thanks," },
        { name: "security", value: "The BigCommerce Security Team" }
    ];

    const selectOptions = [
        { label: "Phrases", value: "phrases" },
        { label: "Code And Preview", value: "code_preview" }
    ]

    const [code, setCode] = useState<string>(jsonData.template);

    const [shoePreview, setShoePreview] = useState("phrases")

    return (
        <PageWrapper title='Template Editor And Preview ' className='max-w-5xl'>
            <SectionLayout title='Phrases' className='space-y-5 px-5'>
                <div className='flex flex-col self-end  gap-y-3'>
                    <div className='space-x-4 flex '>
                        {
                            shoePreview === 'phrases' && (
                                <PhraseModal />
                            )
                        }

                        <Select
                            onValueChange={(value) => {
                                setShoePreview(value)
                            }}
                            defaultValue='phrases'

                        >
                            <SelectTrigger className='w-52' >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent  >
                                <SelectGroup>
                                    {selectOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {
                    shoePreview === 'code_preview' ? (
                        <CodeEditorWithPreview initialCode={code} />
                    ) : (
                        <PhraseList phrases={phrases} />
                    )
                }

            </SectionLayout>

        </PageWrapper>
    )
}

export default EmailTemplateEditPage
