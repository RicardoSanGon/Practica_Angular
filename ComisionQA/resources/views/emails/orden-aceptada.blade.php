<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Orden Aceptada</title>
</head>
<body>
    <h2>¡Tu orden ha sido aceptada!</h2>

    <p>Detalles de la orden:</p>
    <ul>
        <li>ID del Detalle: {{ $orderDetail->id }}</li>
        <li>Cantidad: {{ $orderDetail->quantity }}</li>
        <li>Modelo: {{ $orderDetail->vehicle_model->model_name }}</li>
    </ul>

    <p>Gracias.</p>
</body>
</html>