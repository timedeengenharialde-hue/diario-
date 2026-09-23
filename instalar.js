// Roda sozinho depois do "npx cap sync": copia o widget para o projeto Android
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const android = path.join(root, 'android', 'app');
if (!fs.existsSync(android)) { console.log('widget: pasta android ainda não existe'); process.exit(0); }
fs.cpSync(path.join(__dirname, 'app'), android, { recursive: true });
const mf = path.join(android, 'src', 'main', 'AndroidManifest.xml');
let s = fs.readFileSync(mf, 'utf8');
if (!s.includes('GatoWidget')) {
  s = s.replace('</application>', fs.readFileSync(path.join(__dirname, 'receiver.xml'), 'utf8') + '    </application>');
  fs.writeFileSync(mf, s);
}
console.log('widget: instalado');
