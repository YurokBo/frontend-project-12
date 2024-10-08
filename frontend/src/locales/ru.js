const ru = {
  translation: {
    auth: {
      login: 'Войти',
      registration: 'Зарегистрироваться',
      text: 'Нет аккаунта? ',
      link: 'Регистрация',
    },
    placeholders: {
      nickname: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
    },
    buttons: {
      login: 'Войти',
      registration: 'Зарегистрироваться',
      logOut: 'Выйти',
      loading: 'Загрузка…',
      send: 'Отправить',
      cancel: 'Отменить',
      rename: 'Переименовать',
      delete: 'Удалить',
      deleting: 'Удаление',
      toggleMenu: 'Управление каналом',
    },
    errors: {
      invalidUsernameOrPassword: 'Неверные имя пользователя или пароль',
      invalidUserName: 'От 3 до 20 символов',
      confirmPassword: 'Пароли должны совпадать',
      shouldBeUniq: 'Имя должно быть уникальным',
      tooShortPassword: 'Не менее 6 символов',
      fetchError: 'Ошибка сети',
      userExists: 'Такой пользователь уже существует',
      requiredField: 'Обязательное поле',
    },
    chat: {
      channels: 'Каналы',
      messages: {
        messagesCount_zero: 'сообщений',
        messagesCount_one: 'сообщение',
        messagesCount_two: 'сообщения',
        messagesCount_few: 'сообщения',
        messagesCount_many: 'сообщений',
        messagesCount_other: 'сообщений',
        enterMessage: 'Введите сообщение...',
        newMessage: 'Новое сообщение',
      },
    },
    modals: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      deleteChannel: 'Удалить канал',
      confirmDelete: 'Уверены?',
      channelName: 'Имя канала',
    },
    toastContent: {
      channelCreated: 'Канал создан',
      channelDeleted: 'Канал удалён',
      channelRenamed: 'Канал переименован',
    },
  },
};

export default ru;
