// ============================================
// Sunshine Academy - API Configuration
// Edit API_BASE to your PHP backend URL
// ============================================

// LOCAL DEVELOPMENT:
export const API_BASE = 'http://localhost/sunshine-complete-v2/sunshine-backend';

// LIVE SERVER (uncomment and edit):
// export const API_BASE = 'https://yourdomain.com/sunshine-backend';

// Submit inquiry form
export async function submitInquiry(formData) {
  try {
    const res = await fetch(`${API_BASE}/api/inquiry.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: 'Network error. Please try again.' };
  }
}
