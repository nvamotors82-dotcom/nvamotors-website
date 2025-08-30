# 🚀 DEPLOY NVAMOTORS - GUÍA PASO A PASO

## ⏱️ **Tiempo estimado: 5-10 minutos**

---

## 📋 **PASO 1: Crear Cuenta en Vercel (2 minutos)**

### 1.1 Acceder a Vercel
- 🌐 **Ir a**: https://vercel.com
- 🔘 **Clic en**: "Sign Up" (esquina superior derecha)

### 1.2 Registro con GitHub
- 🔘 **Seleccionar**: "Continue with GitHub"
- 🔐 **Autorizar**: Permitir acceso a Vercel
- ✅ **Completar registro**

---

## 📁 **PASO 2: Subir Proyecto a GitHub (3 minutos)**

### Opción A: GitHub Desktop (Recomendado - Más fácil)

#### 2.1 Descargar GitHub Desktop
- 🌐 **Ir a**: https://desktop.github.com/
- ⬇️ **Descargar** e instalar

#### 2.2 Crear Repositorio
- 🔘 **Abrir GitHub Desktop**
- 🔘 **"Create a New Repository"**
- 📝 **Name**: `nvamotors-website`
- 📂 **Local Path**: Selecciona la carpeta `/app`
- ✅ **"Create Repository"**

#### 2.3 Publicar
- 🔘 **"Publish repository"**
- ✅ **Mantener público** (o privado si prefieres)
- 🔘 **"Publish Repository"**

### Opción B: Línea de Comandos
```bash
cd /app
git init
git add .
git commit -m "Initial NVAMOTORS website - Full featured car dealership"
git branch -M main
# Crear repositorio en GitHub primero, luego:
git remote add origin https://github.com/TU_USUARIO/nvamotors-website.git
git push -u origin main
```

---

## 🚀 **PASO 3: Deploy en Vercel (3 minutos)**

### 3.1 Crear Nuevo Proyecto
- 🔘 **En Vercel Dashboard**: "New Project"
- 📂 **Seleccionar**: `nvamotors-website` de tus repositorios
- 🔘 **"Import"**

### 3.2 Configurar Proyecto
**Framework Preset**: `Create React App` ✅ (Se detecta automáticamente)

**Configuraciones importantes:**
```
Root Directory: frontend ✅
Build Command: yarn build ✅  
Output Directory: build ✅
Install Command: yarn install ✅
```

### 3.3 Variables de Entorno
🔘 **Expandir "Environment Variables"**

**Agregar estas 4 variables:**
```
Nombre: REACT_APP_EMAILJS_PUBLIC_KEY
Valor: xWdEifU1XvRWVtdWW

Nombre: REACT_APP_EMAILJS_SERVICE_ID  
Valor: service_6numtzx

Nombre: REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID
Valor: nvamotors_contact_templa

Nombre: REACT_APP_EMAILJS_TESTDRIVE_TEMPLATE_ID
Valor: nvamotors_testdrive_temp
```

### 3.4 Deploy
- 🔘 **"Deploy"**
- ⏳ **Esperar 2-3 minutos** (Vercel construye tu sitio)
- 🎉 **¡LISTO! Tu sitio está LIVE**

---

## 🌐 **PASO 4: ¡Tu Sitio Está VIVO!**

### 4.1 URL Automática
Vercel te dará una URL como:
- `https://nvamotors-website.vercel.app`
- `https://nvamotors-website-tu-usuario.vercel.app`

### 4.2 Verificar Funcionamiento
✅ **Verificar que todo funcione:**
- [ ] Página carga correctamente
- [ ] WhatsApp chat aparece (esquina inferior derecha)
- [ ] Formularios envían emails
- [ ] Responsive en móvil
- [ ] Todas las secciones cargan

---

## 🎯 **PASO 5: Personalizar URL (Opcional)**

### Opción A: Cambiar Subdomain (GRATIS)
- 🔘 **Project Settings** → **Domains**
- 🔘 **"Add Domain"**
- 📝 **Escribir**: `nvamotors.vercel.app`
- ✅ **Confirmar**

### Opción B: Dominio Personalizado ($10-15/año)
- 🛒 **Comprar dominio**: nvamotors.com (Namecheap, GoDaddy)
- 🔗 **Agregar en Vercel**: Project Settings → Domains
- 🔧 **Configurar DNS** (Vercel te guía automáticamente)

---

## 🎊 **¡FELICIDADES! NVAMOTORS ESTÁ LIVE**

### ✅ **Lo que tienes ahora:**
- 🌐 **Sitio web profesional** en internet
- ⚡ **Velocidad súper rápida** (CDN global)
- 🔒 **HTTPS automático** (SSL gratis)
- 📱 **100% responsive**
- 💬 **WhatsApp chat funcional**
- 📧 **Emails automáticos**
- 🏆 **Todos los elementos de confianza**
- 🔄 **Updates automáticos** (cuando cambies GitHub)

### 📊 **Estadísticas de tu sitio:**
- Visita: https://vercel.com/dashboard → Tu proyecto → Analytics
- **Métricas disponibles**: Visitantes, performance, errores

---

## 🆘 **¿Problemas? Soluciones Rápidas**

### ❌ **Error de Build:**
- Verificar que "Root Directory" sea `frontend`
- Verificar variables de entorno

### ❌ **Página en blanco:**
- Verificar que las variables de entorno estén configuradas
- Check console en DevTools del navegador

### ❌ **WhatsApp no funciona:**
- Verificar número (702) 501-9216 en el código
- Probar desde móvil

---

## 📞 **Soporte 24/7:**
- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: Chat en vivo gratis
- **Discord Vercel**: Comunidad activa

**🚀 ¡Tu dealership NVAMOTORS ya está generando confianza en internet!** 🏆