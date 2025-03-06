import 'package:flutter/material.dart';
import '../components/sidebar.dart';
import '../components/topbar.dart';
import '../theme/app_theme.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgColor,
      body: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Topbar(),
                Container(
                  padding: const EdgeInsets.all(20),
                  child: const Text('Contenido principal aquí'),
                ),
              ],
            ),
          ),
          const Sidebar(),
        ],
      ),
    );
  }
}
