import 'package:flutter/material.dart';
import 'package:window_manager/window_manager.dart';
import 'views/home_view.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Inicializar window_manager
  await windowManager.ensureInitialized();

  // Configurar ventana
  WindowOptions windowOptions = const WindowOptions(
    size: Size(1200, 800),
    center: true,
    backgroundColor: Colors.transparent,
    skipTaskbar: false,
    titleBarStyle: TitleBarStyle.hidden,
    minimumSize: Size(800, 600),
  );

  await windowManager.waitUntilReadyToShow(windowOptions, () async {
    await windowManager.show();
    await windowManager.focus();
  });

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BANNECAPE',
      debugShowCheckedModeBanner: false, // Agregar esta línea
      theme: AppTheme.lightTheme,
      home: const HomeView(),
    );
  }
}
