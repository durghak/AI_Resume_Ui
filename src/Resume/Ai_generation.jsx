


// function Resumeform() {
//   const resumeRef = useRef(); // This is like a 'hook' to grab the resume element
  
//   // ... your existing state and Ai_generate function ...

//   const downloadPDF = () => {
//     const element = resumeRef.current; // The specific box we want to print
//     const options = {
//       margin:       10,
//       filename:     'My_Resume.pdf',
//       image:        { type: 'jpeg', quality: 0.98 },
//       html2canvas:  { scale: 2 }, // Higher scale = better quality
//       jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     };

//     html2pdf().set(options).from(element).save();
//   };

//   return (
//     <Box sx={{ /* your existing styles */ }}>
//       {/* ... your form code ... */}

//       {resume && (
//         <Box sx={{ mt: 4, width: '100%', maxWidth: '800px' }}>
          
//           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//              <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
//                 {isEditing ? "Save & Preview" : "Edit Text"}
//              </Button>
             
//              {/* NEW DOWNLOAD BUTTON */}
//              <Button variant="contained" color="success" onClick={downloadPDF}>
//                 Download PDF
//              </Button>
//           </Box>

//           {/* This 'ref' tells the PDF library to ONLY capture this box */}
//           <Box 
//             ref={resumeRef} 
//             sx={{ p: 4, border: '1px solid #ddd', backgroundColor: '#fff', color: '#000' }}
//           >
//             {isEditing ? (
//               <TextField 
//                 fullWidth multiline value={resume} 
//                 onChange={(e) => setResume(e.target.value)} 
//               />
//             ) : (
//               <ReactMarkdown>{resume}</ReactMarkdown>
//             )}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// }