const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json()); 


app.post("/first-unique-character", async (req, res) => {
    const { text_to_process } = req.body; 
    
  if (typeof text_to_process !== "string") {
    return res.status(400).json({
      error: "Invalid input. 'text_to_process' must be a string.",
      timestamp: new Date().toISOString(),
    });
    }
    
    const index = findFirstUniqueChar(text_to_process);
    
  const response = {
    first_unique_char: index !== -1 ? text_to_process[index] : -1,
    first_unique_char_index: index,
    timestamp: new Date().toISOString(),
  };

  console.log(
    `[${response.timestamp}] API called with text_to_process: "${text_to_process}"`
  );
  res.json(response);
});

function findFirstUniqueChar(str) {
    const charCount = {}; 
    
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]] === 1) {
      return i; 
    }
  }

  return -1; 
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
