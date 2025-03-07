import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const SHARP_API_TOKEN = process.env.SHARP_API_TOKEN || 'your_sharp_api_token_here';

export const parseResume = async (resumeUrl) => {
  try {
    let filePath;
    const isLocalFile = resumeUrl.startsWith('/uploads/');

    if (isLocalFile) {
      filePath = path.join(process.cwd(), resumeUrl);
      if (!fs.existsSync(filePath)) {
        throw new Error('Resume file not found on server');
      }
    } else {
      // Download the file from the URL
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error(`Failed to download resume from ${resumeUrl}`);
      filePath = path.join(process.cwd(), 'uploads', `temp-${Date.now()}.pdf`);

      const fileStream = fs.createWriteStream(filePath);
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on('error', reject);
        fileStream.on('finish', resolve);
      });
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('language', 'English');

    const apiResponse = await fetch('https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume', {
      method: 'POST',
      headers: {
        'apy-token': SHARP_API_TOKEN,
      },
      body: form,
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(`SharpAPI request failed: ${apiResponse.status} - ${errorText}`);
    }

    const result = await apiResponse.json();
   

    console.log(result);
   
    
    // Clean up temporary file if downloaded
    if (!isLocalFile && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      name: result.name || 'Unknown',
      email: result.email || 'Unknown',
      skills: result.skills || [],
    };
  } catch (err) {
    
    throw new Error(`Failed to parse resume: ${err.message}`);
  }
};