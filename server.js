/*  const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const pdf = require('html-pdf'); 
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to convert HTML/CSS to PDF
app.get('/', async (req, res) => {
  try {
    // Read the content of index.html synchronously
    const htmlTemplate = fs.readFileSync(__dirname + '/demo/demo/index.html', 'utf8'); 

    const { cssStyles } = req.body;  

    const options = {
      format: 'Letter', 
      border: '10mm',
      
    };

    // Combine HTML template and CSS styles
    const finalHtml = `<style>${cssStyles}</style>${htmlTemplate}`;

    // Generate PDF from the HTML template
    pdf.create(finalHtml, options).toStream((err, pdfStream) => {
      if (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Error generating PDF');
        return;
      }

      // Set response headers for PDF content
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

      // Pipe the PDF stream to the response
      pdfStream.pipe(res);

      pdfStream.on('end', () => {
        console.log('PDF created and sent successfully');
        res.end();
      });
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 







 */





/* 

const express = require('express');
const fs = require('fs');

const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to upload HTML file and convert to PDF


// app.get("/", async (req, res) => {
//   try {
//       const filePath = path.join(__dirname, "htmlToPdf.html");
//       res.sendFile(filePath);
//   } catch (error) {
//       console.error("Error sending file:", error);
//       res.status(500).send("Error sending the file");
//   }
// });


app.post('/upload', upload.single('htmlFile'), async (req, res) => {
  try {
    const htmlBuffer = req.file.buffer.toString('utf-8');

    const { cssStyles } = req.body;

    const options = {
      format: 'Letter',
      border: '10mm',
    };

    const finalHtml = `<style>${cssStyles}</style>${htmlBuffer}`;

    pdf.create(finalHtml, options).toStream((err, pdfStream) => {
      if (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Error generating PDF');
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

      pdfStream.pipe(res);

      pdfStream.on('end', () => {
        console.log('PDF created and sent successfully');
        res.end();
      });
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

const PORT =  3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 */


/////////////////////////////////////////// working ///////////////////////////////////////////////


/* 
const express = require('express');
const pdf = require('html-pdf');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require("fs")
const path = require("path")
app.use(fileUpload());


app.get("/", async (req, res) => {
    try {
        const filePath = path.join(__dirname, "htmlToPdf.html");
        res.sendFile(filePath);
    } catch (error) {
        console.error("Error sending file:", error);
        res.status(500).send("Error sending the file");
    }
  });
  



app.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.htmlFile) {
      return res.status(400).send('No files were uploaded.');
    }

    const htmlBuffer = req.files.htmlFile.data.toString('utf-8');
    const { cssStyles } = req.body;

    const options = {
      format: 'Letter',
      border: '10mm',
    };

    const finalHtml = `<style>${cssStyles}</style>${htmlBuffer}`;

    pdf.create(finalHtml, options).toStream((err, pdfStream) => {
      if (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Error generating PDF');
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

      pdfStream.pipe(res);

      pdfStream.on('end', () => {
        console.log('PDF created and sent successfully');
        res.end();
      });
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 */





//////////////////////////////////////// working according to Sachin ////////////////////////////
/* 
const express = require('express');
const pdf = require('html-pdf');
const cors = require('cors');
const app = express();

const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "new.html");
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).send("Error sending the file");
  }
});

app.post('/convert', async (req, res) => {
  try {
    const { html, cssStyles } = req.body;

    if (!html || !cssStyles) {
      return res.status(400).send('HTML code and CSS styles are required.');
    }

    const options = {
      format: 'Letter',
      border: '10mm',
    };

    const finalHtml = `<style>${cssStyles}</style>${html}`;

    pdf.create(finalHtml, options).toStream((err, pdfStream) => {
      if (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Error generating PDF');
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

      pdfStream.pipe(res);

      pdfStream.on('end', () => {
        console.log('PDF created and sent successfully');
        res.end();
      });
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 */




/* 

const express = require('express');
const pdf = require('html-pdf');
const cors = require('cors');
const app = express();

const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "new.html");
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).send("Error sending the file");
  }
});

app.post('/convert', async (req, res) => {
  try {
    const { html, cssStyles } = req.body;

    if (!html || !cssStyles) {
      return res.status(400).send('HTML code and CSS styles are required.');
    }

    const options = {
      format: 'Letter',
      border: '10mm',
    };

    const finalHtml = `<style>${cssStyles}</style>${html}`;

    pdf.create(finalHtml, options).toStream((err, pdfStream) => {
      if (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Error generating PDF');
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

      pdfStream.pipe(res);

      pdfStream.on('end', () => {
        console.log('PDF created and sent successfully');
        res.end();
      });
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 */







/* 
const express = require('express');
const pdf = require('html-pdf');
const cors = require('cors');
const app = express();

const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "new.html");
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).send("Error sending the file");
  }
});

app.post('/convert', async (req, res) => {
  try {
    const { html, cssStyles } = req.body;

    if (!html || !cssStyles) {
      return res.status(400).send('HTML code and CSS styles are required.');
    }

    const options = {
      format: 'Letter',
      border: '10mm',
    };

    const finalHtml = `<style>${cssStyles}</style>${html}`;

    pdf.create(finalHtml, options).toStream((err, pdfStream) => {
      if (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Error generating PDF');
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

      pdfStream.pipe(res);

      pdfStream.on('end', () => {
        console.log('PDF created and sent successfully');
        res.end();
      });
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








 */




const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")
const path = require("path")
const app = express();

// Middleware to parse JSON body
app.use(bodyParser.json());


app.get("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "new.html");
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).send("Error sending the file");
  }
});


app.post('/convert', async (req, res) => {
  try {
    const { html, cssStyles } = req.body;

    if (!html || !cssStyles) {
      return res.status(400).send('HTML code and CSS styles are required.');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set content to the page
    await page.setContent(`<style>${cssStyles}</style>${html}`);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm',
      },
    });

    await browser.close();

    // Send PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
