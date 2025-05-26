export default function getCookie(name) {
  if (typeof document === "undefined") return {};
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return JSON.parse(decodeURIComponent(parts.pop().split(";").shift()));
    } catch {
      return {};
    }
  }
  return {};
}
