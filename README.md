# Soru ve Konu Takip Uygulaması

Soru ve Konu Takip Uygulaması sayesinde hazırlandığınız sınavın konularını ve her konu için çözdüğünüz soruları istatiksel bir şekilde takip edebilirsiniz. Tüm veriler görselleştirilmiş şekilde karşınıza çıkar. Geliştirme aşaması devam etmekte olup şu an sorunsuz şekilde çalışmaktadır.

# Script Özellikleri ( Soru ve Konu Takip Scripti )

 - KPSS,DGS,ÜNİVERSİTE SINAVI gibi bir çok seçeneği barındırmaktadır,
 - İstenilen sınav türü çok kolay bir şekilde oluşturulabilir,
 - Kullanıcı kayıt sistemi,
 - Tüm kullanıcı bilgileri hatasız şekilde database'e kaydetme,
 - Gelişmiş Admin Paneli,
 - Tüm sınavların konuları sürükle-bırak tarzı basit bir yönetime sahiptir,
 - Sınavlara ders eklemek sürükle-bırak tarzı basit bir yönteme sahiptir,
 - Kullanıcı her ders için kendi analizlerini görselleştirilmiş bir şekilde görebilir,
 - Çözülen soru sayısı sistem tarafından hesaplanır,
 - En çok hangi konudan soru çözülmüş görülebilir,
 - Konuların bitip bitmediğinin takibi yapılabilir,
 - Ders konularının yüzde kaçı bitmiş analiz yapar,
 - Tamamen dinamik şekilde her sınav için çalışır,
 - Kullanıcı için çok basittir,

 

# Kurulumu

Sizde kendi sitenize bu scripti dahil etmek istiyorsanız node.js destekli sunucunuzun olması yeterli.
**

	## Kurulum Aşamaları**
	
	

 1. Projeyi direkt https://github.com/emresengul/soru-ve-konu-takip-scripti/archive/master.zip adresinden indirebilirsiniz.
 2. İndirdikten sonra dosya konumunda terminal açarak npm install yazmanız durumunda eğer localhost'da iseniz  [http://localhost:8080/](http://localhost:8080/) portundan siteye ulaşabilirsiniz.

Sunucuya kurulum işlemlerini heroku üzerinden yapabilirsiniz.
Not: Mongodb database yapısını kullanmaktadır. Mongodb bağlantı cümleciğini app.js içindeki connectionString içerisine yazmanız yeterli.

## Kullanılan Teknolojiler( Paketler )

 - Pug ( Template Engine )
 - @sendgrid/mail ( Mail Server )
 - bcrypt ( Şifreleme İşlemleri )
 - connect-mongodb-session ( Kullanıcı İşlemleri )
 - cookie-parser ( Kullanıcı İşlemleri )
 - crypto ( Şifreleme İşlemleri )
 - csurf ( Form Güvenliği )
 - express-session ( Kullanıcı İşlemleri )
 - Express ( Server Oluşturma )
 - Path ( Url Yapılandırma )
 - validator ( Doğrulama İşlemleri )
 - Nodemon ( Değişikliğe Göre Sunucuyu Aktifleştirme )
 - Mongoose ( MongoDB için kolay kullanım )
 - Cookie-Parser ( Kullanıcının Son İşlemlerini Cookie Yerine Kaydetme )
 - Body-Parser ( Dosyaların Yolu ve Sunucu İşlemleri )
 - Chart.js ( Veri Görselleştirme, Grafikler )
 # Yapım Aşaması
 **Proje 8 günde yapılmıştır. 8  günde ortalama 80 saat üzerinde çalışılmıştır. Bu proje sayesinde kullanıcı kayıt işlemleri ve nosql yapısını daha iyi anladım**
 
# Gelecek Özellikler
 - Modern Tasarım
 - Kullanıcı Profil Düzenleme Sayfası
 - Kullanıcı Profili Sayfası
 - 
 
