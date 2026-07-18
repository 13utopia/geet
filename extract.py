import cv2
import os

video_path = "E:/Geet/Packaging/Create_a_photorealistic_CGI_pa.mp4"
output_dir = "E:/Geet/Packaging/frames"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)
frame_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    filename = os.path.join(output_dir, f"frame_{frame_count:04d}.jpg")
    
    # Save with very high JPEG quality to ensure sharp images
    cv2.imwrite(filename, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 98])
    frame_count += 1

cap.release()
print(f"Extracted {frame_count} high-quality frames to {output_dir}")
