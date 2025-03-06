import 'package:flutter/material.dart';
import 'views/home_view.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mi Aplicación Flutter',
      theme: AppTheme.lightTheme,
      home: const HomeView(),
    );
  }
}
