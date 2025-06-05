// import 'package:flutter/material.dart';

// class AppTheme {
//   // Colores del tema
//   static const Color themeColor = Color.fromARGB(255, 231, 73, 223);
//   static const Color bgColor = Color.fromARGB(255, 229, 231, 107);
//   static const Color textColor = Color.fromARGB(255, 32, 53, 65);

//   static final ThemeData lightTheme = ThemeData(
//     primaryColor: themeColor,
//     scaffoldBackgroundColor: bgColor,
//     textTheme: const TextTheme(
//       bodyLarge: TextStyle(color: textColor),
//       titleLarge: TextStyle(
//         color: textColor,
//         fontSize: 40,
//         fontWeight: FontWeight.bold,
//       ),
//     ),
//   );
// }

// import 'package:flutter/material.dart';

// class AppTheme {
//   // // Paleta de colores personalizada
//   // static const Color primaryColor = Color(0xFF155263); // Azul oscuro
//   // static const Color accentColor = Color(0xFFFF6F3C); // Naranja fuerte
//   // static const Color secondaryColor = Color(0xFFFF9A3C); // Naranja medio
//   // static const Color yellowColor = Color(0xFFFFC93C); // Amarillo
//   // static const Color textColor = Colors.white;

//   // Nueva paleta de colores
//   static const Color primaryColor = Color(0xFFEA9648);
//   static const Color accentColor = Color(0xFFE6EFF1);
//   static const Color secondaryColor = Color(0xFF5C7A89);
//   static const Color yellowColor = Color(0xFF344854);
//   static const Color textColor = Colors.white;

//   static final ThemeData lightTheme = ThemeData(
//     primaryColor: primaryColor,
//     scaffoldBackgroundColor: yellowColor,
//     appBarTheme: const AppBarTheme(
//       backgroundColor: primaryColor,
//       foregroundColor: Colors.white,
//     ),
//     floatingActionButtonTheme: const FloatingActionButtonThemeData(
//       backgroundColor: accentColor,
//       foregroundColor: Colors.white,
//     ),
//     colorScheme: ColorScheme.light(
//       primary: primaryColor,
//       secondary: accentColor,
//       background: yellowColor,
//       surface: secondaryColor,
//       onPrimary: Colors.white,
//       onSecondary: Colors.white,
//       onBackground: primaryColor,
//       onSurface: primaryColor,
//     ),
//     textTheme: const TextTheme(
//       bodyLarge: TextStyle(color: primaryColor),
//       titleLarge: TextStyle(
//         color: primaryColor,
//         fontSize: 40,
//         fontWeight: FontWeight.bold,P
//       ),
//     ),
//   );
// }

import 'package:flutter/material.dart';

class AppTheme {
  static const Color background = Color(0xFFDDD5D0); // Fondo general
  static const Color surface = Color(0xFFCFC0BD); // Tarjetas, paneles
  static const Color secondary = Color(0xFFB8B8AA); // Elementos secundarios
  static const Color primary = Color(0xFF7F9183); // AppBar, botones principales
  static const Color accent = Color(0xFF586F6B); // Botones destacados, FAB
  static const Color onPrimary = Colors.white; // Texto sobre primary
  static const Color onSecondary = Colors.black87; // Texto sobre secondary
  static const Color onBackground = Colors.black87; // Texto sobre fondo
  static const Color onSurface = Colors.black87; // Texto sobre surface

  static final ThemeData lightTheme = ThemeData(
    primaryColor: primary,
    scaffoldBackgroundColor: background,
    appBarTheme: const AppBarTheme(
      backgroundColor: primary,
      foregroundColor: onPrimary,
    ),
    floatingActionButtonTheme: const FloatingActionButtonThemeData(
      backgroundColor: accent,
      foregroundColor: Colors.white,
    ),
    colorScheme: ColorScheme.light(
      primary: primary,
      secondary: secondary,
      background: background,
      surface: surface,
      onPrimary: onPrimary,
      onSecondary: onSecondary,
      onBackground: onBackground,
      onSurface: onSurface,
    ),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(color: onBackground),
      titleLarge: TextStyle(
        color: onBackground,
        fontSize: 40,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}
