export async function getPublicProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/";
    
    const res = await fetch(`${baseUrl}product/public?page=1&limit=3`, {
      next: { revalidate: 60 }
    });
   
    if (!res.ok) return [];

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}