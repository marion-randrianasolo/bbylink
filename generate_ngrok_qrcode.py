import qrcode

# URL publique ngrok
url = "https://bear-enhanced-mutt.ngrok-free.app"

# Génération du QR
img = qrcode.make(url)

# Sauvegarde dans un fichier distinct
img.save("qrcode_ngrok.png")

print(f"QR code généré pour l'URL ngrok : {url}")
