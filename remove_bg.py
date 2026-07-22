import os
import glob
from rembg import remove
from PIL import Image

input_dir = "E:/Geet/Packaging/frames"
output_dir = "E:/Geet/Packaging/frames_nobg"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Get all WEBP frames
frames = sorted(glob.glob(os.path.join(input_dir, "*.webp")))

print(f"Found {len(frames)} frames. Starting background removal...")

for i, frame_path in enumerate(frames):
    filename = os.path.basename(frame_path)
    name, _ = os.path.splitext(filename)
    # Save as PNG to preserve transparency
    output_path = os.path.join(output_dir, f"{name}.png")
    
    # Skip if already processed
    if os.path.exists(output_path):
        print(f"Skipping {filename}, already processed.")
        continue

    # Process image
    input_image = Image.open(frame_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    
    if (i + 1) % 10 == 0:
        print(f"Processed {i + 1}/{len(frames)} frames...")

print("Background removal complete!")
