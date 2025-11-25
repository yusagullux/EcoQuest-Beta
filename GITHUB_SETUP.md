# 🚀 GitHub'a Yükleme Rehberi

## Adım 1: Git Kurulumu

Eğer Git yüklü değilse:

1. [Git'i indirin](https://git-scm.com/download/win)
2. Kurulumu tamamlayın
3. Terminal'i yeniden başlatın

## Adım 2: GitHub'da Repository Oluşturma

1. [GitHub.com](https://github.com) hesabınıza giriş yapın
2. Sağ üst köşedeki **"+"** butonuna tıklayın
3. **"New repository"** seçin
4. Repository adı: `EcoQuest` (veya istediğiniz isim)
5. Açıklama: "Gamified Environmental Sustainability Platform"
6. **Public** veya **Private** seçin
7. **"Initialize this repository with a README"** seçeneğini **İŞARETLEMEYİN**
8. **"Create repository"** butonuna tıklayın

## Adım 3: Projeyi GitHub'a Yükleme

Terminal'de proje klasörüne gidin ve şu komutları çalıştırın:

```bash
# Git repository'sini başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: EcoQuest gamified sustainability platform"

# GitHub repository URL'inizi ekleyin (kendi URL'inizi kullanın)
git remote add origin https://github.com/KULLANICI_ADINIZ/EcoQuest.git

# Ana branch'i main olarak ayarla
git branch -M main

# GitHub'a yükle
git push -u origin main
```

## Adım 4: .gitignore Dosyası Oluşturma

Proje kök dizininde `.gitignore` dosyası oluşturun:

```
# Firebase
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log

# Node modules (eğer varsa)
node_modules/
package-lock.json

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Build files
dist/
build/
```

## Alternatif: GitHub Desktop Kullanımı

1. [GitHub Desktop'u indirin](https://desktop.github.com/)
2. GitHub hesabınızla giriş yapın
3. **File > Add Local Repository**
4. Proje klasörünü seçin
5. **Publish repository** butonuna tıklayın

## Sorun Giderme

### "git is not recognized" hatası
- Git'in PATH'e eklendiğinden emin olun
- Terminal'i yeniden başlatın

### "Permission denied" hatası
- GitHub'da Personal Access Token oluşturun
- Git credentials'ı güncelleyin

### "Repository not found" hatası
- Remote URL'in doğru olduğundan emin olun
- GitHub'da repository'nin oluşturulduğunu kontrol edin

