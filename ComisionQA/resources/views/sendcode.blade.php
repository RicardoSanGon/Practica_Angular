<!DOCTYPE html>
<html lang="es">
<head>
    <title>Código de Verificación</title>
</head>
<body>
<h1>Hola, {{ $nombre }}</h1>
<p>
    Hemos recibido una solicitud de inicio de sesión en tu cuenta. Por favor, verifica tu identidad con el siguiente código:
</p>
<h2>{{ $codigo }}</h2>
<p>
    Este código expirará en 30 minutos.
</p>
<p>
    Si no has solicitado este código de verificación, por favor ignora este correo.
</p>
<p>
    Saludos,<br>
    ComisionQA
</p>
</body>
</html>
