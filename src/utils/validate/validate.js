import { ref} from 'vue'
import * as rules from './validateRules.js'
export const useValidation = () => {
  const errors = ref({}) /// { email: [] , password: [] } 陣列存放錯誤訊息

  // 用validate 函數遍歷fields 物件

  // const fields = {
  //     email: {
  //       value: email.value,
  //       rules: ['required', 'email'],
  //     },
  //     password: {
  //       value: password.value,
  //       rules: [{ type: 'minLength', value: 6 }, 'required'],
  //     },
  //   };
  function validate(field, value, fieldRules) {
    errors.value[field] = []

    // 解包裹響應式值
    // console.log('value',value)
    // const unwrappedValue = unref(value)
    // console.log('unwrappedValue',unwrappedValue)
    // // 檢查是否為空陣列
    // if (Array.isArray(unwrappedValue) && unwrappedValue.length === 0) {
    //   errors.value[field].push('必填')
    //   return
    // }

    // // 檢查是否為空物件
    // if (
    //   typeof unwrappedValue === 'object' &&
    //   !Array.isArray(unwrappedValue) &&
    //   Object.keys(unwrappedValue).length === 0
    // ) {
    //   errors.value[field].push('必填')
    //   return
    // }
    /*傳入單一自訂義規則函數*/
    if (typeof fieldRules === 'function') {
      const errorMessage = fieldRules(value)
      if (errorMessage) {
        errors.value[field].push(errorMessage)
      }
    } else {
      /*傳入陣列規則*/
      fieldRules.forEach((rule) => {
        if (typeof rule === 'string') {
          const errorMessage = rules[rule](value)
          if (errorMessage) {
            errors.value[field].push(errorMessage)
          }
        } else if (typeof rule === 'object') {
          const errorMessage = rules[rule.type](value, rule.value)
          if (errorMessage) {
            errors.value[field].push(errorMessage)
          }
          /*傳入自訂義規則函數*/
        } else if (typeof rule === 'function') {
          const errorMessage = rule(value)
          if (errorMessage) {
            errors.value[field].push(errorMessage)
          }
        }
      })
    }
    /*陣列中的每一個規則function從module中取出執行返回錯誤訊息與否*/
    /*有錯誤訊息丟到errors.value[field]陣列中*/
  }
  function validateField(field, value, rules) {
    errors.value[field] = []
    validate(field, value, rules)
  }

  function validateFields(fields, callback) {
    /*清空所有錯誤*/
    errors.value = {}
    Object.keys(fields).forEach((field) => {
      const { value, rules } = fields[field]
      validate(field, value, rules)
    })

    let isPass = true
    Object.keys(errors.value).forEach((field) => {
      if (errors.value[field].length > 0) {
        isPass = false
      }
    })
    if (isPass) {
      if (typeof callback === 'function') {
        callback()
      } else {
        console.error('callback is not a function')
      }
    }
  }

  return {
    errors,
    validate,
    validateField,
    validateFields
  }
}
