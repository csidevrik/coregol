import 'package:flutter/material.dart';

class AppTheme {
  // Colores del tema
  static const Color themeColor = Color(0xFF68af9e);
  static const Color bgColor = Color(0xFFecf5f9);
  static const Color textColor = Color(0xFF485f53);

  static final ThemeData lightTheme = ThemeData(
    primaryColor: themeColor,
    scaffoldBackgroundColor: bgColor,
    textTheme: const TextTheme(
      bodyLarge: TextStyle(color: textColor),
      titleLarge: TextStyle(
        color: textColor,
        fontSize: 40,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}
