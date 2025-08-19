// ระบบแชทจำลอง
function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (message === "") return;

  const chatBox = document.getElementById("chat-box");
  const newMsg = document.createElement("p");
  newMsg.textContent = "คุณ: " + message;
  chatBox.appendChild(newMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ระบบสุ่มคำทำนาย
function drawFortune() {
  const fortunes = [
    "วันนี้จะมีโชคลาภเล็กๆ น้อยๆ ✨",
    "คุณจะเจอเรื่องราวดีๆ ไม่คาดฝัน 🌈",
    "ระวังคำพูด อาจทำให้เกิดความเข้าใจผิด 💭",
    "สิ่งที่คุณรอคอยกำลังจะมา 💫",
    "ความรักกำลังจะเบ่งบาน 💖"
  ];
  const result = fortunes[Math.floor(Math.random() * fortunes.length)];
  document.getElementById("fortune-result").textContent = result;
}
