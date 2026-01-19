// SLUG ini yang membedakan setiap undangan.
// Kita ambil dari Environment Variable (Settingan Server).
// Jika tidak ada settingan, default-nya ke 'romeo-juliet'.

export const CLIENT_SLUG = process.env.NEXT_PUBLIC_WEDDING_SLUG || 'romeo-juliet';