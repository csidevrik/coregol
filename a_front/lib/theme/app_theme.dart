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
