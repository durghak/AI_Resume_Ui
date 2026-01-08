import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useRef } from 'react'; 
import html2pdf from 'html2pdf.js';
import ReactMarkdown from 'react-markdown';
import { API_URL } from "./config";

function Resumeform() {

  const [form, setform] = useState({
    full_name: "", Email_Address: "", Phone_Number: "", job_title: "",
    skills: "", experience: "", education: "",
    certifications: "", projects: ""
  });
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 2. The Reference for PDF
  const resumeRef = useRef();

  const formData = [
    { name: "full_name", label: "Full Name" },
    { name: "Email_Address", label: "Email Address" },
    { name: "Phone_Number", label: "Phone Number" },
    { name: "job_title", label: "Job Title" },
    { name: "skills", label: "Skills" },
    { name: "experience", label: "Experience" },
    { name: "education", label: "Education Details" },
    { name: "certifications", label: "Certification" },
    { name: "projects", label: "Projects", multiline: true, rows: 4 },
  ];

  // 3. AI Generation Logic
  const Ai_generate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data.error || "Failed to generate"));
        return;
      }
      setResume(data.answer);
      alert("Resume Generated Successfully! ✔");
    } catch (err) {
      alert("System Error: Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  // 4. PDF Download Logic
  const downloadPDF = () => {
    const element = resumeRef.current; 
    const options = {
      margin: 10,
      filename: `${form.full_name || 'My'}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '50px' }}>
      <Typography variant="h4" gutterBottom>Resume Builder</Typography>
      
      {formData.map((field) => (
        <TextField
          required
          key={field.name}
          label={field.label}
          variant="standard"
          value={form[field.name]}
          onChange={(e) => setform({ ...form, [field.name]: e.target.value })}
          multiline={field.multiline || false}
          rows={field.rows || 1}
          sx={{ width: '400px' }}
        />
      ))}

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={Ai_generate} 
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Resume"}
      </Button>

      {/* RESULT SECTION */}
      {resume && (
        <Box sx={{ mt: 4, width: '100%', maxWidth: '800px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save & Preview" : "Edit Text"}
            </Button>
            <Button variant="contained" color="success" onClick={downloadPDF}>
              Download PDF
            </Button>
          </Box>

          {/* The ref is attached here to capture the content */}
          <Box 
            ref={resumeRef} 
            sx={{ 
              p: 4, 
              border: '1px solid #ccc', 
              borderRadius: 2, 
              backgroundColor: '#fff',
              textAlign: 'left'
            }}
          >
            {isEditing ? (
              <TextField
                fullWidth multiline variant="outlined"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            ) : (
              <Box sx={{ color: 'black' }}>
                <ReactMarkdown>{resume}</ReactMarkdown>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Resumeform;