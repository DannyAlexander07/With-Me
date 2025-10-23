<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = isset($_POST['Nombres']) ? trim(htmlspecialchars($_POST['Nombres'])) : '';
    $apellido = isset($_POST['Apellidos']) ? trim(htmlspecialchars($_POST['Apellidos'])) : '';
    $correo = isset($_POST['Correo']) ? trim($_POST['Correo']) : '';
    $celular = isset($_POST['Celular']) ? trim(htmlspecialchars($_POST['Celular'])) : '';
    $empresa = isset($_POST['Empresa']) ? trim(htmlspecialchars($_POST['Empresa'])) : '';
    $servicio = isset($_POST['Servicio']) ? trim(htmlspecialchars($_POST['Servicio'])) : 'No especificado';
    $mensaje = isset($_POST['Mensaje']) ? trim(htmlspecialchars($_POST['Mensaje'])) : '';

    if (empty($nombre) || empty($apellido) || empty($correo) || empty($celular) || empty($mensaje)) {
        echo "Los campos nombre, apellido, correo, celular y mensaje son obligatorios.";
        exit();
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "La dirección de correo electrónico proporcionada no es válida.";
        exit();
    }

    $to = "contacto@estudiowithme.com";
    $subject = "Nuevo mensaje de tu web de: $nombre $apellido";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    
    $headers .= "From: Formulario Web <no-reply@estudiowithme.com>" . "\r\n";
    
    $headers .= "Reply-To: $correo" . "\r\n";

    $message = "
    <html>
    <body>
        <div class='container' style='font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto;'>
            <h2 style='color: #20214c;'>Nuevo Mensaje del Sitio Web</h2>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr style='background-color: #f2f2f2;'>
                <th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Nombre:</th>
                <td style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>{$nombre}</td>
                </tr>
                <tr>
                <th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Apellido:</th><td style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>{$apellido}</td></tr>
                <tr style='background-color: #f2f2f2;'><th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Correo:</th><td style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>{$correo}</td></tr>
                <tr><th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Celular:</th><td style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>{$celular}</td></tr>
                <tr style='background-color: #f2f2f2;'><th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Empresa:</th><td style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>{$empresa}</td></tr>
                <tr><th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Servicio:</th><td style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>{$servicio}</td></tr>
                <tr style='background-color: #f2f2f2;'><th style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'>Mensaje:</th><td style='padding: 10px; text-align: left; border-bottom: 1px solid #ddd;'><p>{$mensaje}</p></td></tr>
            </table>
        </div>
    </body>
    </html>
    ";

    if (mail($to, $subject, $message, $headers)) {
        header("Location: /gracias");
        exit();
    } else {
        echo "Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.";
    }
} else {
    header("Location: /"); 
    exit();
}
?>