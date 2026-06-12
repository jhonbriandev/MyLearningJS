// ================================================================
// TOAST
// ================================================================
export function mostrarToast(mensaje, tipo = 'success') {
  const toast = document.createElement('div')
  toast.classList.add('toast', `toast-${tipo}`)
  toast.textContent = mensaje
  document.body.appendChild(toast)
  setTimeout(() => toast.classList.add('visible'), 10)
  setTimeout(() => {
    toast.classList.remove('visible')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}