<?php 
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$street = $_POST['street'];
	$house = $_POST['house'];
	$corpus = $_POST['part'];
	$flat = $_POST['flat'];
	$floor = $_POST['floor'];
	$comment = $_POST['comment'];
	$pay = $_POST['pay'];
	$disturb = $_POST['dont-disturb'];
	$disturb = isset($disturb) ? 'НЕТ' : 'ДА';

	$mail_message = '
	<html>
		<head>
			<title>Заказ</title>
		</head>
		<body>
			<h2>Заказ с сайта</h2>
			<ul>
				<li>Имя: ' . $name . '</li>
				<li>Телефон: ' . $phone . '</li>
				<li>Улица: ' . $street . '</li>
				<li>Дом: ' . $house . '</li>
				<li>Корпус: ' . $corpus . '</li>
				<li>Квартира: ' . $flat . '</li>
				<li>Этаж: ' . $floor . '</li>
				<li>Комментарий: ' . $comment . '</li>
				<li>Способ оплаты: ' . $pay . '</li>
				<li>Не перезванивать: ' . $disturb . '</li>
			</ul>
		</body>
	</html>
	';

	$headers = "From: Администратор сайта <admin@burgers.ru>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

	$mail = mail('neuxunil@yandex.ru', 'Заказ с сайта', $mail_message, $headers);

    $data = [];

if ($mail) {
    $data['status'] = "OK";
    $data['mes'] = "Письмо успешно отправлено";
}else {
    $data['status'] = "NO";
    $data['mes'] = "На сервере произошла ошибка";
}
    echo json_encode($data);
?>