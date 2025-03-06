import 'package:flutter/material.dart';
import 'package:window_manager/window_manager.dart';
import '../components/sidebar.dart';
import '../components/topbar.dart';
import '../theme/app_theme.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgColor,
      body: Column(
        children: [
          // Barra de título personalizada
          Container(
            height: 32,
            color: AppTheme.bgColor,
            child: GestureDetector(
              behavior: HitTestBehavior.translucent,
              onPanStart: (details) {
                windowManager.startDragging();
              },
              child: Row(
                children: [
                  const SizedBox(width: 16),
                  const Text(
                    'Mi Aplicación',
                    style: TextStyle(
                        color: Colors
                            .black), // Cambia Colors.white a Colors.black o el color que prefieras
                  ),
                  const Spacer(),
                  // Botón minimizar
                  IconButton(
                    icon: const Icon(Icons.minimize,
                        color: Colors
                            .black), // Cambia Colors.white a Colors.black o el color que prefieras
                    onPressed: () async {
                      await windowManager.minimize();
                    },
                  ),
                  // Botón cerrar
                  IconButton(
                    icon: const Icon(Icons.close,
                        color: Colors
                            .black), // Cambia Colors.white a Colors.black o el color que prefieras
                    onPressed: () async {
                      await windowManager.close();
                    },
                  ),
                ],
              ),
            ),
          ),
          // Contenido principal existente
          Expanded(
            child: Row(
              children: [
                const Sidebar(), // Sidebar ahora está primero
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Topbar(),
                      Container(
                        padding: const EdgeInsets.all(20),
                        child: const Text(
                          'Contenido principal aquí',
                          style: TextStyle(color: Colors.black),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
