//======================================
//
//======================================
export function decryptReverse(message) {
  return message.split( '' ).reverse( ).join( '' )
}

//======================================
//
//======================================
export function decryptMessage(message, cipherType) {
  switch (cipherType.toUpperCase()) {
    case "REVERSE":
      const encrypt = decryptReverse(message);
      return {decrypted : encrypt}
    default:
      return {error : true, message : "cipher Type is not correct"}
  }
}