
//======================================
//
//======================================
export function encryptReverse(message) {
  return message.split( '' ).reverse( ).join( '' )
}

//======================================
//
//======================================
export function encryptMessage(message, cipherType) {
  switch (cipherType.toUpperCase()) {
    case "REVERSE":
      const encrypt = encryptReverse(message);
      return {encrypted : encrypt}
    default:
      return {error : true, message : "cipher Type is not correct"}
  }
}
