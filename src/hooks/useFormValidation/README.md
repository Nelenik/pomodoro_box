## useFormValidation хук

Хук `useFormValidation` предоставляет возможность управления валидацией формы в React-приложениях.

### Использование

1. **Импорт**

```javascript
import { useFormValidation } from "./путь/к/файлу/с/хуком";
```
2. **Инициализация хука:**
```javascript
const { register, formState, errors, onSubmit, formData, formRef, reset } = useFormValidation(initialData, validateOn);
```
- `initialData`: Начальные данные полей формы, в виде объекта `{name: 'Jane', text: ''}`.
- `validateOn`: Опциональный параметр, указывающий, когда происходит валидация. Пример: 'blur change' - валидация будет происходить на событиях blur и change.

3. **Регистрация полей формы:**
```javascript
const { value, name, onChange, onBlur } = register(fieldName, rules);
```
- `fieldName`: Имя поля формы.
- `rules`: Опциональный объект с правилами валидации для данного поля. это вложенный объект поля которого имя правила, а значение объект с опциональными полями, важно указать поле value. Поле с сообщением и функцией валидации можно опустить. `iterface Rule { value: number | boolean | RegExp; message: string;  validation: (inputValue: string) => boolean | void;}`. Изначально описаны следующие правила валидации: required, min, max, minLength, maxLength, email, pattern. 

4. **Обработчик отправки формы:**
```javascript
const handleSubmit = onSubmit(submitHandler);
```
- `submitHandler`: Опциональная функция, вызываемая при успешной валидации формы.

5. **Сброс формы**
  `reset`: функция сбрасывает значения в форме, обнуляет formData и errors


7. **Доступ к состояниям формы:**
- `formState`: Текущее состояние формы ("valid" или "invalid").
- `errors`: Объект с ошибками валидации полей формы.
- `formData`: Объект с данными формы.
- `formRef`: ссылка на форму(реф)
  
8. **Пример использования**
```javascript
  const MyForm = () => {
    const { register, formState, errors, onSubmit, reset, formRef } = useFormValidation(initialData, "blur change");

    const handleSubmit = onSubmit(() => {
      console.log("Form submitted successfully!");
      reset()
    });

    return (
      <form onSubmit={handleSubmit} ref={formRef}>
        <input {...register("username", { required: {value:true}, minLength: {value: 3} })} />
        {errors.username && <span>{errors.username}</span>}

        <input type="email" {...register("email", { required: {value: true}, email: {value: true} })} />
        {errors.email && <span>{errors.email}</span>}

        <button type="submit" disabled={formState === "invalid"}>Submit</button>
      </form>
    );
  };
```