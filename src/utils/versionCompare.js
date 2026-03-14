export const isUpdateRequired = (current, latest) => {
  const c = current.split('.').map(Number);
  const l = latest.split('.').map(Number);

  for (let i = 0; i < l.length; i++) {
    if ((c[i] || 0) < l[i]) return true;
    if ((c[i] || 0) > l[i]) return false;
  }
  return false;
};
