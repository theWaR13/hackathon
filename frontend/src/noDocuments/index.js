/* eslint-disable */
import React, { Component } from 'react'
import { Col, FormGroup,  ControlLabel, Checkbox, Button, Modal, ModalHeader, ModalBody } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './action.js'

import './style.scss'

var modalTitle = '';
var modalAddress = '';

export default class NoDocuments extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	}

	componentDidMount = () => {

		  var center = {lat: 66.25, lng: 94.15};

		  var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 3,
		    center: center
		  });

	}

	modalShow = () => {
		this.setState({ showModal: true });
	}

	modalClose = () => {
		this.setState({ showModal: false });
	}

	putMapMarkers = (data) => {

		  var center = {lat: 66.25, lng: 94.15};

		  if (document.getElementById('map') === null) return;

		  var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 3,
		    center: center
		  });

		  for (let i = 0; i < data.length; i++) {
		  	for (let j = 0; j < data[i].length; j++) {
		  		let kind = typeof data[i][j].service === 'undefined' ? 'higher' : 'course';
		  		let modalTitleString = data[i][j].title;
		  		let modalAddressString = data[i][j].address;
		  		let addressString = data[i][j].address.split(' ').join('+');
		  		fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressString).then(response => {
		  			response.json().then(data => {

		  				if (typeof data.results[0] !== 'undefined') {

			  				let lat = data.results[0].geometry.location.lat;
			  				let lng = data.results[0].geometry.location.lng;

			  				let coords = { lat: lat, lng: lng };

			  				if (kind === 'higher') {

				  				var marker = new google.maps.Marker({
				  					position: coords,
				  					map: map,
				  					title: 'Title',
				  					icon: 'https://www.gstatic.com/images/branding/product/1x/maps_64dp.png'
				  				});

			  				}

			  				else {
				  				var marker = new google.maps.Marker({
				  					position: coords,
				  					map: map,
				  					title: 'Title'
				  				});
			  				}



			  				marker.addListener('click', () => {
			  					modalTitle = modalTitleString;
			  					modalAddress = modalAddressString;
			  					this.modalShow();
			  				});

		  				}
		  			});
		  		});
		  	}
		  }

	}



	higherEducationClick = () => {
		this.props.actions.resetHigherEducation();
	}

	coursesClick = () => {
		this.props.actions.resetCourses();
	}

    render = () => {
    	var coursesJsonData = [{"id":1, "kind": "higher", "title":"Профессиональная подготовка по профессии ”Вахтерный матрос”","studying_time":908,"price_for_cource":20000},{"id":2,"kind": "higher", "title":"Профессиональная подготовка по профессии “Судовой повар”","studying_time":840,"price_for_cource":20000},{"id":3,"kind": "higher", "title":"Профессиональная подготовка по профессии ”Вахтерный моторист”","studying_time":784,"price_for_cource":20000},{"id":4,"kind": "higher", "title":"Профессиональная подготовка по профессии “Судовой электрик”","studying_time":1032,"price_for_cource":40000},{"id":5, "kind": "course", "title":"Курс “Начальная подготовка по безопасности”","studying_time":64,"price_for_cource":8000},{"id":6,"kind": "course", "title":"Курс “Подготовка по охране” ","studying_time":16,"price_for_cource":4000}];
		var professionsJsonData = [{"title":"Вахтенный матрос","certificate_of_education":"свидетельство о прохождении в морском образовательном учреждении подготовки по программе \"вахтенный матрос\"","certificate_of_experience":"справки о плавании с выполнением обязанностей по несению вахты на ходовом мостике под наблюдением дипломированного специалиста не менее двух месяцев","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"1,5,6"},{"title":"Судовой повар","certificate_of_education":"свидетельство о подготовке или переподготовке по программе \"повар судовой\"","certificate_of_experience":"справки о плавании на судах в должности помощника (дублера, практиканта) судового повара в течение одного месяца за последние три года","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"2,5,6"},{"title":"Вахтенный моторист","certificate_of_education":"свидетельство о подготовке в морском образовательном учреждении по программе \"вахтенный моторист\" или документ о получении высшего или среднего профессионального образования в области эксплуатации главной двигательной установки в морском образовательном учреждении","certificate_of_experience":"справки о плавании с выполнением обязанностей по несению вахты в машинном отделении под наблюдением дипломированного специалиста не менее двух месяцев","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"3,5,6"},{"title":"Судовой электрик","certificate_of_education":"свидетельство о подготовке в морском образовательном учреждении по программе \"судовой электрик\", или документ о получении высшего или среднего профессионального образования в области эксплуатации судового электрооборудования и автоматики в морском образовательном учреждении","certificate_of_experience":"справки о плавании с выполнением обязанностей по обслуживанию судового электрооборудования под наблюдением дипломированного специалиста не менее шести месяцев","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"4,5,6"}];

    	let jsonHigherData = [{"title":"Федеральное государственное бюджетное образовательное учреждение высшего образования \"Волжский государственный университет водного транспорта\"","address":"603005, Нижегородская область, г. Нижний Новгород, ул. Нестерова, д. 5А. ","contacts":"8(831) 419-32-29 Факс (831) 419-47-56 kolosova@vgavt-nn.ru","working_hours":"с 8.00 до 17.00 ","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Каспийский институт морского и речного транспорта - филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Волжский государственный университет водного транспорта\"","address":"414014, г. Астрахань, ул. Костина, д. 2","contacts":" 8(851) 239-05-66 director@afgavt.ru","working_hours":"с 8.00 до 17.00 ","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Казанский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Волжский государственный университет водного транспорта\"","address":"420108, Республика Татарстан, г. Казань, ул. Портовая, д. 19 ","contacts":"8(843) 293-59-29 vgavt22@yandex.ru","working_hours":"с 8.00 до 17.00 ","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Пермский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Волжский государственный университет водного транспорта\"","address":"614060,  г. Пермь, бульвар Гагарина, д. 35 ","contacts":"8(342) 282-54-03 perm-vgavt@yandex.ru","working_hours":"с 8.00 до 17.00 ","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Самарский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Волжский государственный университет водного транспорта\"","address":"443020, г. Самара, ул. Ленинградская, д. 75","contacts":" 8(846) 332-40-62 samara-vgavt@mail.ru","working_hours":"с 8.00 до 17.00 ","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Федеральное государственное бюджетное образовательное учреждение высшего образования \"Государственный университет морского и речного флота имени адмирала С.О. Макарова\"","address":"198035,  г.Санкт-Петербург, Васильевский Остров, Косая линия,  д. 15-А  ","contacts":"8(812)322-19-34 Факс(812)322-07-82 rectorat@gma.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Мурманский Филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный университет морского и речного флота имени адмирала С.О. Макарова\"","address":"183038, г. Мурманск, Терский переулок,  д. 13 ","contacts":"mfspguvk@yandex.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по дополнительного профессионального  образования"},{"title":"Арктический морской институт имени В.И. Воронина филиал  Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный университет морского и речного флота имени адмирала С.О. Макарова\" в городе Архангельске","address":"163000 г. Архангельск набережная Северной Двины, д. 111 ","contacts":"amu_voronina@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Беломорско-Онежский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный университет морского и речного флота имени адмирала С.О. Макарова\"","address":"185030 г. Петрозаводск, ул. Варламова, д. 34 ","contacts":"pru@onego.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Воронежский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный университет морского и речного флота имени адмирала С.О. Макарова\"","address":"394033, Воронежская область, г. Воронеж,  Ленинский  проспект,  д. 174л ","contacts":"vfspguvk@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Котласский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный университет морского и речного флота имени адмирала С.О. Макарова\"","address":"165311,  Архангельская область, г. Котлас, ул. Заполярная, д. 19 ","contacts":"kfspguvk@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Печорское речное училище - филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный университет морского и речного флота имени адмирала С.О. Макарова\"","address":"169600,  г. Печора,  Печорский проспект,  д. 47/8 pru_spb@mail.ru","contacts":"pru_spb@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Федеральное государственное бюджетное образовательное учреждение высшего образования \"Московская государственная академия водного транспорта\"","address":"117105, г. Москва, Новоданиловская набережная, д. 2, корпус 1 ","contacts":"8(495) 633-16-01,  факс 633-16-02 mgavt@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Уфимский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Московская государственная академия водного транспорта\"","address":"450017,  Республика Башкортостан,  г. Уфа,  ул. Ахметова, д. 275 ","contacts":"8(3472)78-28-83  ukru@ufanet.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Велико-Устюгский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Московская государственная академия водного транспорта\"","address":"162390, Вологодская область,  г.Великий Устюг, пл. Коммуны, д. 14","contacts":"8 (8173)82-22-43  vuru@vologda.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Рыбинский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Московская государственная академия водного транспорта\"","address":"152900,  Ярославская область,  г. Рыбинск,  ул. Вихарева, д. 3 ","contacts":"8(4855)26-71-54   rybinsk-rru@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Федеральное бюджетное образовательное учреждение высшего профессионального образования \"Морской государственный университет имени адмирала Г.И. Невельского\"","address":"690059  г. Владивосток ул. Верхнепортовая, д. 50а тел./факс ","contacts":"8(4232) 41-49-68 Legkaya@msun.ru Efimova@msun.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Сахалинское высшее морское училище имени Т.Б. Гуженко - филиал Федерального бюджетного образовательного учреждения высшего профессионального образования \"Морской государственный университет имени адмирала Г.И. Невельского\"","address":"694620 Сахалинская область, г. Холмск, ул. Адмирала Макарова, д. 1","contacts":"  8(424) 335-02-67 S.Bogdanov@msun.ru sakhalincol@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Находкинский филиал Федерального бюджетного образовательного учреждения высшего профессионального образования \"Морской государственный университет имени адмирала Г.И. Невельского\"","address":"692900 Приморский край, г. Находка, ул. Заводская, д. 3  ","contacts":"8(266) 5-56-01 nfmgu@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Амурский филиал Федерального бюджетного образовательного учреждения высшего профессионального образования \"Морской государственный университет имени адмирала Г.И. Невельского\"","address":"675002 Амурская область, г. Благовещенск, ул. Краснофлотская, д. 83/95,","contacts":" 8(416) 222-65-60 amur@msun.ru Tarlakov@msun.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего и дополнительного профессионального образования"},{"title":"Федеральное государственное бюджетное образовательное учреждение высшего образования \"Сибирский государственный университет водного транспорта\"","address":"630099, г. Новосибирск, ул. Щетинкина, д. 33","contacts":" 8(383) 222-64-68 факс (383) 222-64-68 ngavt@ngs.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Хабаровский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Сибирский государственный университет водного транспорта\"","address":"680007, Хабаровский край, г. Хабаровск, пер. Ремесленный, 4 ","contacts":"8(421) 236-96-24 khvngavt@inbox.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Якутский институт водного транспорта - филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Сибирский государственный университет водного транспорта\"","address":"677000, Республика Саха (Якутия),  г. Якутск, ул. Водников, д. 1 ","contacts":"8(411) 221-90-16 yakru@yandex.ru lfngavt@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Усть-Кутский институт водного транспорта - филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Сибирский государственный университет водного транспорта\"","address":"666793,  Иркутская область,  г. Усть-Кут,  ул. Володарского, д. 65 ","contacts":"8(395) 655-86-85 metod417@front.ru ofngavt@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Омский институт водного транспорта - филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Сибирский государственный университет водного транспорта\"","address":"644099, г. Омск,  ул. Ивана Алексеева, д. 4 ","contacts":"8(381) 223-73-92 info@rc.sotline.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Красноярский институт водного транспорта - филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Сибирский государственный университет водного транспорта\"","address":"660025, г. Красноярск,  пер. Якорный, д. 3 ","contacts":"8(391) 213-30-37 kkru@rambler.ru kkru@yandex.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Федеральное государственное бюджетное образовательное учреждение высшего образования \"Государственный морской университет имени адмирала Ф.Ф. Ушакова\"","address":"353918, Краснодарский край, г.  Новороссийск, проспект Ленина, д. 93","contacts":"тел./факс 8(8617) 71-75-25 mail@nsma.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Крымский филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный морской университет имени адмирала Ф.Ф. Ушакова\" - представительство Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный морской университет имени адмирала Ф.Ф. Ушакова\" в г. Севастополь","address":"Россия,  г.  Севастополь,  ул. Героев Севастополя,  д. 7, корпус 8/22 ","contacts":"8-1038(0692)48-82-01 kf_mga@meta.ua","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"Институт водного транспорта имени Г.Я. Седова - филиал Федерального государственного бюджетного образовательного учреждения высшего образования \"Государственный морской университет имени адмирала Ф.Ф. Ушакова\"","address":"344006, г. Ростов-на-Дону, ул. Седова, д. 8/2 ","contacts":"8(863) 265-35-15 lutkov@aaanet.ru rfnsma@mail.ru","working_hours":"с 9.00 до 18.00","service":"Подготовка специалистов по программам среднего профессионального, дополнительного профессионального и высшего образования"},{"title":"\nФедеральное бюджетное учреждение «Музей морского флота»","address":"115035, г. Москва, ул. Большая Ордынка, д. 19, стр. 1","contacts":"8 (495) 951-94-50, 8 (495) 951-16-53 mmflota@mail.ru","working_hours":"с 9.00 до 18.00","service":"Запись на экскурсию"}];
    	let jsonCoursesData = [{ "title": "Владивостокский морской рыбопромышленный колледж ФГБОУ ВПО Дальрыбвтуз", "address": "690068, г.Владивосток, ул.Кирова, д.93" }, { "title": "БУТЦ Калининградский морской рыбопромышленный колледж", "address": "236039, Калининград, ул.Мореходная, д.3" }, { "title": "БУТЦ ОНЕГО", "address": "185005, Республика Карелия г.Петрозаводск, ул.Пробная, д. 15" }, { "title": "БУТЦ АНОО Кадры-Морепродукта", "address": "Сахалинская обл, г.Холмск, ул.Советская, д.109, кв.3" }, { "title": "БУТЦ НОУ Астраханский морской учебно-тренажерный центр", "address": " г. Астрахань, ул. Наб. Прив. Затона, д.14, корп.1" }, { "title": "БУТЦ НОУ УТЦ ГАЛС", "address": "344019, г. Ростов-на-Дону, ул. 1-я линия, 58/102" }, { "title": "БУТЦ НОЧУ ЦДП СТОРМ", "address": "г. Москва, ул. Лавочкина, д. 34" }, { "title": "ГАОУ СПО СПб МТК", "address": "198260, г. Санкт-Петербург, пр. Народного ополчения, д.189" }, { "title": "Каспийский институт морского и речного транспорта − филиал ФБОУ ВПО ВГАВТ", "address": "414024 г. Астрахань, ул. Б. Хмельницкого, д.3" }, { "title": "ФГБОУ ВО ГУМРФ им. адмирала С.О. Макарова", "address": "198035, г. Санкт-Петербург, ул. Двинская, д.5/7" }, { "title": "НОАНО УТЦ ПРИСКО", "address": "692904, Приморский край, г.Находка, ул. Административный городок, д.2" }, { "title": "НОУ ДО Владивостокская мореходная школа", "address": "г. Владивосток, ул. Чумака Мыс, д. 1А" }, { "title": "ОАО Мурманское морское пароходство", "address": "г. Мурманск, ул. Комитерна, д.15" }, { "title": "Омский институт водного транспорта (филиал) ФГОУ ВПО Новосибирская государственная академия водного транспорта", "address": "г. Омск, ул. Ивана Алексеева, д. 4" }, { "title": "ООО Научно-технический учебный тренажерный центр", "address": "236016, г.Калининград, ул.Литовский вал, д.38." }, { "title": "УТС Белокаменка ОАО АТФ", "address": "г. Архангельск, ул. Маймаксанская, д.77" }, { "title": "УТЦ НОУ ДПО Береговой учебно-тренажерный центр подготовки плавсостава", "address": "603116, г. Нижний Новгород, ул. Гордеевская, д.5А" }, { "title": "УТЦ НОУ ВПО Дальневосточный институт коммуникаций", "address": "690013, Приморский край, г. Владивосток, ул. Каплунова, д.7" }, { "title": "УТЦ ЧОУ УТЦ Новошип Тренинг", "address": "353920, г. Новороссийск, ул. Куникова, д.28" }, { "title": "УТЦ ЧОУ ДПО СОВКОМФЛОТ", "address": " Санкт-Петербург, наб. реки Мойки, д.3А" }, { "title": "УТЦ ЧОУ ДПО СОВКОМФЛОТ", "address": "Москва, ул. Гашека, д.6" }, { "title": "ЧОУ СПО Тихоокеанское командное морское училище", "address": "г. Владивосток, ул. Коммунаров, д.21" }];

    	let dataForMap = [];
  		let coursesIDs;
  		let courses = [];
  		let coursesResult = null;
    	
    	if (this.props.noDocuments.higherEducation) {
    		dataForMap.push(jsonHigherData);
    	}

    	if (this.props.noDocuments.coursesEducation) {
    		dataForMap.push(jsonCoursesData);
    	}

		this.putMapMarkers(dataForMap);

		if (this.props.sailor.specialization !== '') {


			for (let i = 0; i < professionsJsonData.length; i++) {
				if (professionsJsonData[i].title === this.props.sailor.specialization) {
					coursesIDs = professionsJsonData[i].courses_ids.split(',');
				}
			}

			for (let i = 0; i < coursesJsonData.length; i++) {
				for (let j = 0; j < coursesIDs.length; j++) {
					if (coursesJsonData[i].id == coursesIDs[j]) {
						courses.push(coursesJsonData[i]);
					}
				}
			}

			coursesResult = courses.map((item, number) => {
				if (item.kind === 'higher' && this.props.noDocuments.higherEducation) {
					return (
						<ul key={ number }>
							<li>Название: { item.title }</li>
							<li>Стоимость: { item.price_for_cource }</li>
							<li>Время на обучение (часов): { item.studying_time }</li>
						</ul>
					)
				}
				else if (item.kind === 'course' && this.props.noDocuments.coursesEducation) {
					return (
						<ul key={ number }>
							<li>Название: { item.title }</li>
							<li>Стоимость: { item.price_for_cource }</li>
							<li>Время на обучение (часов): { item.studying_time }</li>
						</ul>
					)
				}
			});


		}



        return (
            <Col componentClass="div" xs={ 12 } className="no-documents">
                <Col componentClass="div" id="map" xs={ 9 } className="no-documents__map"></Col>
                <Col componentClass="div" xs={ 3 } className="no-documents__menu">
                	<div className="no-documents__menu__buttons">
	                	<Button bsStyle={ this.props.noDocuments.higherEducation ? 'primary' : 'default' } onClick={ this.higherEducationClick }>Высшее образование</Button>
	                	<Button bsStyle={ this.props.noDocuments.coursesEducation ? 'primary' : 'default' } onClick={ this.coursesClick }>Курсы УТЦ</Button>
                	</div>
                	<div className="no-documents__course-list">
	                	Список необходимых курсов:
	                	{ coursesResult }
                	</div>
                </Col>
                <Modal show={ this.state.showModal } onHide={ this.modalClose }>
                	<ModalHeader closeButton>{ modalTitle }</ModalHeader>
                	<ModalBody>{ modalAddress }</ModalBody>
                </Modal>
            </Col>
        )
    };

}

function mapStateToProps(state) {
    return {
        noDocuments: state.noDocuments,
        sailor: state.sailor
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoDocuments);