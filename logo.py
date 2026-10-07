import cv2 
import numpy as np 
 
# ========================================== 
# BACA LOGO 
# ========================================== 
img = cv2.imread( 
    "assets/Wismilak_Group.jpg", 
    cv2.IMREAD_GRAYSCALE 
) 
 
if img is None: 
    print("Logo tidak ditemukan!") 
    exit() 
 
# ========================================== 
# RESIZE 
# ========================================== 
img = cv2.resize(img, (800, 500)) 
 
# ========================================== 
# DETEKSI GARIS 
# ========================================== 
edges = cv2.Canny(img, 80, 180) 
 
kernel = np.ones((2, 2), np.uint8) 
 
edges = cv2.morphologyEx( 
    edges, 
    cv2.MORPH_CLOSE, 
    kernel 
) 
 
# ========================================== 
# CARI KONTUR 
# ========================================== 
contours, _ = cv2.findContours( 
    edges, 
    cv2.RETR_LIST, 
    cv2.CHAIN_APPROX_NONE 
) 
 
# ========================================== 
# HAPUS KONTUR KECIL 
# ========================================== 
contours = [ 
    c for c in contours 
    if cv2.arcLength(c, False) > 30 
] 
 
# ========================================== 
# URUTKAN KONTUR 
# ========================================== 
contours = sorted( 
    contours, 
    key=lambda c: cv2.arcLength(c, False), 
    reverse=True 
) 
 
# ========================================== 
# CANVAS PUTIH 
# ========================================== 
height, width = img.shape 
 
canvas = np.ones( 
    (height, width, 3), 
    dtype=np.uint8 
) * 255 
 
# ========================================== 
# VIDEO OUTPUT MP4 
# ========================================== 
fourcc = cv2.VideoWriter_fourcc(*"mp4v") 
 
video = cv2.VideoWriter( 
    "animasi_wismilak_hijau.mp4", 
    fourcc, 
    30, 
    (width, height) 
) 
 
# ========================================== 
# KECEPATAN BOLPOIN 
# ========================================== 
points_per_frame = 6 
 
# ========================================== 
# WARNA GARIS HIJAU 
# ========================================== 
GREEN = (0, 150, 0) 
 
# ========================================== 
# ANIMASI MENGGAMBAR 
# ========================================== 
for contour in contours: 
 
    points = contour.reshape(-1, 2) 
 
    if len(points) < 10: 
        continue 
 
    previous_point = tuple(points[0]) 
 
    for i in range( 
        1, 
        len(points), 
        points_per_frame 
    ): 
 
        end = min( 
            i + points_per_frame, 
            len(points) 
        ) 
 
        segment = points[i:end] 
 
        # ================================== 
        # GAMBAR GARIS HIJAU 
        # ================================== 
        for point in segment: 
 
            current_point = tuple(point) 
 
            cv2.line( 
                canvas, 
                previous_point, 
                current_point, 
                GREEN, 
                2, 
                cv2.LINE_AA 
            ) 
 
            previous_point = current_point 
 
        # ================================== 
        # TAMPILKAN ANIMASI 
        # ================================== 
        cv2.imshow( 
            "Animasi Logo Wismilak", 
            canvas 
        ) 
 
        # ================================== 
        # SIMPAN FRAME KE MP4 
        # ================================== 
        video.write(canvas) 
 
        # ESC = keluar 
        if cv2.waitKey(1) & 0xFF == 27: 
 
            video.release() 
            cv2.destroyAllWindows() 
            exit() 
 
# ========================================== 
# ANIMASI SELESAI 
# ========================================== 
 
print("Animasi selesai!") 
print("Logo tetap ditampilkan.") 
print("Tekan ESC untuk keluar.") 
 
# ========================================== 
# TAHAN HASIL AKHIR DI VIDEO 
# ========================================== 
 
for _ in range(90): 
 
    video.write(canvas) 
 
# ========================================== 
# TETAP TAMPIL DI WINDOW YANG SAMA 
# ========================================== 
 
while True: 
 
    cv2.imshow( 
        "Animasi Logo Wismilak", 
        canvas 
    ) 
 
    # ESC untuk keluar 
    if cv2.waitKey(30) & 0xFF == 27: 
        break 
 
# ========================================== 
# SELESAI 
# ========================================== 
 
video.release() 
cv2.destroyAllWindows() 
 
print("Program selesai.") 
print() 
print("File MP4:") 
print("animasi_wismilak_hijau.mp4")