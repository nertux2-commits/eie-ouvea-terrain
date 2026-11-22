// Remplace JSZip (CDN parfois bloqué) : archive ZIP sans compression, générée localement
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(u){let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRC[(c^u[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0}
function Zip(){const parts=[],cd=[];let off=0;const enc=new TextEncoder();
 this.add=(name,u)=>{const nm=enc.encode(name),crc=crc32(u),h=new DataView(new ArrayBuffer(30));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(8,0,true);h.setUint16(10,0,true);h.setUint16(12,0x21,true);
  h.setUint32(14,crc,true);h.setUint32(18,u.length,true);h.setUint32(22,u.length,true);h.setUint16(26,nm.length,true);h.setUint16(28,0,true);
  parts.push(h.buffer,nm,new Blob([u]));
  const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(10,0,true);c.setUint16(12,0,true);c.setUint16(14,0x21,true);
  c.setUint32(16,crc,true);c.setUint32(20,u.length,true);c.setUint32(24,u.length,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
  cd.push(c.buffer,nm);off+=30+nm.length+u.length};
 this.addText=(name,t)=>this.add(name,enc.encode(t));
 this.blob=()=>{let size=0;for(let i=0;i<cd.length;i+=2)size+=46+cd[i+1].length;const e=new DataView(new ArrayBuffer(22));const n=cd.length/2;
  e.setUint32(0,0x06054b50,true);e.setUint16(8,n,true);e.setUint16(10,n,true);e.setUint32(12,size,true);e.setUint32(16,off,true);
  return new Blob([...parts,...cd,e.buffer],{type:'application/zip'})}}
function b64u8(s){const bin=atob(s);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return a}
class JSZip{constructor(){this.z=new Zip()}
 file(n,d,o){if(o&&o.base64)this.z.add(n,b64u8(d));else this.z.addText(n,d);return this}
 async generateAsync(opt,cb){if(cb)cb({percent:100});return this.z.blob()}}
