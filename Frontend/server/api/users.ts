import type { User } from '~/types'

const users: User[] = [{
  id: 1,
  name: 'Администратор',
  email: 'admin@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=admin'
  },
  status: 'subscribed',
  location: 'Москва, Россия'
}, {
  id: 2,
  name: 'Иван Петров',
  email: 'ivan.petrov@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=ivan'
  },
  status: 'subscribed',
  location: 'Санкт-Петербург, Россия'
}, {
  id: 3,
  name: 'Мария Сидорова',
  email: 'maria.sidorova@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=maria'
  },
  status: 'subscribed',
  location: 'Новосибирск, Россия'
}, {
  id: 4,
  name: 'Алексей Козлов',
  email: 'alexey.kozlov@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=alexey'
  },
  status: 'unsubscribed',
  location: 'Екатеринбург, Россия'
}, {
  id: 5,
  name: 'Елена Волкова',
  email: 'elena.volkova@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=elena'
  },
  status: 'subscribed',
  location: 'Казань, Россия'
}, {
  id: 6,
  name: 'Дмитрий Соколов',
  email: 'dmitry.sokolov@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=dmitry'
  },
  status: 'bounced',
  location: 'Нижний Новгород, Россия'
}, {
  id: 7,
  name: 'Анна Морозова',
  email: 'anna.morozova@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=anna'
  },
  status: 'subscribed',
  location: 'Самара, Россия'
}, {
  id: 8,
  name: 'Сергей Новиков',
  email: 'sergey.novikov@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=sergey'
  },
  status: 'subscribed',
  location: 'Омск, Россия'
}, {
  id: 9,
  name: 'Ольга Кузнецова',
  email: 'olga.kuznetsova@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=olga'
  },
  status: 'subscribed',
  location: 'Ростов-на-Дону, Россия'
}, {
  id: 10,
  name: 'Владимир Попов',
  email: 'vladimir.popov@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=vladimir'
  },
  status: 'unsubscribed',
  location: 'Уфа, Россия'
}, {
  id: 11,
  name: 'Татьяна Васильева',
  email: 'tatyana.vasilieva@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=tatyana'
  },
  status: 'subscribed',
  location: 'Воронеж, Россия'
}, {
  id: 12,
  name: 'Андрей Семенов',
  email: 'andrey.semenov@sml.ru',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=andrey'
  },
  status: 'bounced',
  location: 'Краснодар, Россия'
}]

export default eventHandler(async () => {
  return users
})
