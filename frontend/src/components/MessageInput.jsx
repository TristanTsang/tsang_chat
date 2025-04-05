import { Group, TextInput, ActionIcon } from "@mantine/core";
import { IconSend, IconPhotoPlus, IconX } from "@tabler/icons-react";
import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form onSubmit={handleSendMessage} style={{ position: "relative" }}>
      <Group m="10px" gap="5px" mb="30px">
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                borderRadius: "5px",
                objectFit: "cover",
                position: "absolute",
                top: "-75px",
                left: "15px",
                height: "75px",
                width: "75px",
              }}
            />
            <ActionIcon
              radius="5px"
              size="20px"
              onClick={removeImage}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                position: "absolute",
                top: "-75px",
                left: "70px",
              }}
            >
              <IconX></IconX>
            </ActionIcon>
          </div>
        )}

        <TextInput
          flex={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextInput>
        <input
          type="file"
          accept="image/*"
          style={{ visibility: "hidden", height: "0px", width: "0px" }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <ActionIcon size="36px" onClick={() => fileInputRef.current?.click()}>
          <IconPhotoPlus stroke="2px"></IconPhotoPlus>
        </ActionIcon>

        <ActionIcon
          size="36"
          type="submit"
          disabled={!text.trim() && !imagePreview}
        >
          <IconSend stroke="2px"></IconSend>
        </ActionIcon>
      </Group>
    </form>
  );
};

export default MessageInput;
