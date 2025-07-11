import qrcode

ip = "172.20.10.12"  # à adapter

img = qrcode.make(f"http://{ip}:5000")
img.save("qrcode.png")
print("QR code généré.")